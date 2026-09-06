resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "namistore-vpc"
  }
}


# -------------------------
# Internet Gateway
# -------------------------

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "namistore-igw"
  }
}


# -------------------------
# Public Subnets
# -------------------------

resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "namistore-public-${count.index + 1}"
  }
}


# -------------------------
# Private Subnets
# -------------------------

resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 101}.0/24"
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "namistore-private-${count.index + 1}"
  }
}


# -------------------------
# Public Route Table
# -------------------------

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "namistore-public-rt"
  }
}


# -------------------------
# Public Route Table Associations
# -------------------------

resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}


# -------------------------
# Private Route Tables
# -------------------------

resource "aws_route_table" "private" {
  count = length(var.availability_zones)

  vpc_id = aws_vpc.main.id

  tags = {
    Name = "namistore-private-rt-${count.index + 1}"
  }
}


# -------------------------
# Private Route Table Associations
# -------------------------

resource "aws_route_table_association" "private" {
  count = length(aws_subnet.private)

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# -------------------------
# Elastic IP for NAT Gateway
# -------------------------

resource "aws_eip" "nat" {

  count = var.enable_nat_gateway ? 1 : 0

  domain = "vpc"

  tags = {
    Name = "namistore-nat-eip"
  }
}

# -------------------------
# NAT Gateway
# -------------------------

resource "aws_nat_gateway" "main" {

  count = var.enable_nat_gateway ? 1 : 0
  allocation_id = aws_eip.nat[0].id
  subnet_id     = aws_subnet.public[0].id

  tags = {
    Name = "namistore-nat-gateway"
  }

  depends_on = [
    aws_internet_gateway.main
  ]
}

resource "aws_route" "private_nat" {
  count = var.enable_nat_gateway ? length(var.availability_zones) : 0

  route_table_id         = aws_route_table.private[count.index].id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.main[0].id
}