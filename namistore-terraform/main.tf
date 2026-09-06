module "vpc" {
  source = "./modules/vpc"

  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  enable_nat_gateway = var.enable_nat_gateway
}

module "security_groups" {
  source = "./modules/security-groups"

  vpc_id = module.vpc.vpc_id
}

module "s3" {
  source = "./modules/s3"

  bucket_name = "namistore-product-images-2026"
}

module "rds" {
  source = "./modules/rds"

  identifier = "namistore-postgresql"

  db_name  = "ecommerce_db"
  username = "postgres"
  password = var.db_password

  private_subnet_ids = module.vpc.private_subnet_ids

  database_security_group_id = module.security_groups.database_security_group_id
}

module "ec2" {
  source = "./modules/ec2"

  vpc_id = module.vpc.vpc_id

  subnet_id = module.vpc.public_subnet_ids[0]

  security_group_id = module.security_groups.backend_security_group_id

  instance_type = var.ec2_instance_type

  instance_name = "namistore-backend"
}

module "ecr" {
  source = "./modules/ecr"
}

module "jenkins" {
  source = "./modules/jenkins"

  vpc_id            = module.vpc.vpc_id
  subnet_id         = module.vpc.public_subnet_ids[0]
  security_group_id = module.security_groups.jenkins_security_group_id

  instance_type = "t3.small"
  instance_name = "namistore-jenkins"
}