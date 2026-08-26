# Security Group for the frontend/load balancer
resource "aws_security_group" "frontend" {
  name        = "namistore-frontend-sg"
  description = "Security group for Namistore frontend"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "namistore-frontend-sg"
  }
}


# Security Group for the backend
resource "aws_security_group" "backend" {
  name        = "namistore-backend-sg"
  description = "Security group for Namistore backend"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow backend traffic from frontend"
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "namistore-backend-sg"
  }
}


# Security Group for PostgreSQL/RDS
resource "aws_security_group" "database" {
  name        = "namistore-database-sg"
  description = "Security group for Namistore PostgreSQL database"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow PostgreSQL from backend"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.backend.id]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "namistore-database-sg"
  }
}