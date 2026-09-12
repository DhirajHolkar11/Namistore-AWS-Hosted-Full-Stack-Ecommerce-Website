variable "vpc_id" {
  description = "ID of the VPC where the security groups will be created"
  type        = string
}

variable "eks_node_security_group_id" {
  description = "EKS node security group allowed to access PostgreSQL"
  type        = string
}