module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  security_group_additional_rules = var.security_group_additional_rules

  name               = var.cluster_name
  kubernetes_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.private_subnet_ids

  # EKS API endpoint
  endpoint_private_access = true
  endpoint_public_access  = true

  endpoint_public_access_cidrs = var.public_access_cidrs

  # Terraform creator gets cluster administrator access
  enable_cluster_creator_admin_permissions = true

  # AWS-managed EKS add-ons
  addons = {
  coredns = {
    addon_version = "v1.13.2-eksbuild.24"
  }

  eks-pod-identity-agent = {
    addon_version  = "v1.4.0-eksbuild.2"
    before_compute = true
  }

  kube-proxy = {
    addon_version = "v1.33.10-eksbuild.21"
  }

  vpc-cni = {
    addon_version  = "v1.23.0-eksbuild.1"
    before_compute = true
  }
}

  # Managed worker nodes
  eks_managed_node_groups = {

    namistore = {

      name = "namistore-node-group"

      ami_type = "AL2023_x86_64_STANDARD"

      instance_types = var.node_instance_types

      min_size     = var.node_min_size
      max_size     = var.node_max_size
      desired_size = var.node_desired_size

      capacity_type = "ON_DEMAND"

      disk_size = 20

      labels = {
        Project     = "Namistore"
        Environment = "production"
      }

      tags = {
        Name    = "namistore-eks-node"
        Project = "Namistore"
      }
    }
  }

  tags = {
    Project     = "Namistore"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}