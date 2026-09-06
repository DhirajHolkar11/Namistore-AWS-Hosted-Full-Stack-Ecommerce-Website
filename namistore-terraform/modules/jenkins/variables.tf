variable "vpc_id" {
  description = "VPC ID where Jenkins will be created"
  type        = string
}

variable "subnet_id" {
  description = "Public subnet where Jenkins will be created"
  type        = string
}

variable "security_group_id" {
  description = "Security group ID for Jenkins"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type for Jenkins"
  type        = string
  default     = "t3.small"
}

variable "instance_name" {
  description = "Name of the Jenkins EC2 instance"
  type        = string
  default     = "namistore-jenkins"
}