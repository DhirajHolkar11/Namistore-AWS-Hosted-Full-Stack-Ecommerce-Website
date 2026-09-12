module "vpc" {
  source = "./modules/vpc"

  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  enable_nat_gateway = var.enable_nat_gateway
}

module "security_groups" {
  source = "./modules/security-groups"

  vpc_id                     = module.vpc.vpc_id
  eks_node_security_group_id = module.eks.node_security_group_id
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


module "eks" {
  source = "./modules/eks"

  cluster_name    = "namistore-eks"
  cluster_version = "1.33"

  vpc_id = "vpc-0c4b140fcdb3b436f"

  private_subnet_ids = [
    "subnet-004cf7872889e91cf",
    "subnet-00a5773ded6b066dd"
  ]

  public_access_cidrs = [
    "205.254.169.250/32"
  ]

  node_instance_types = [
    "t3.small"
  ]

  node_min_size     = 1
  node_max_size     = 2
  node_desired_size = 1

  security_group_additional_rules = {
    ingress_from_jenkins = {
      description              = "Allow Jenkins to access EKS API"
      protocol                 = "tcp"
      from_port                = 443
      to_port                  = 443
      type                     = "ingress"
      source_security_group_id = module.security_groups.jenkins_security_group_id
    }
  }

}