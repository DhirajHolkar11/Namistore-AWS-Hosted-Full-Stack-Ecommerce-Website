variable "vpc_id" {
  description = "ID of the VPC where the EC2 instance will be created"
  type        = string
}

variable "subnet_id" {
  description = "ID of the public subnet where the EC2 instance will be created"
  type        = string
}

variable "security_group_id" {
  description = "Security group ID for the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "instance_name" {
  description = "Name of the EC2 instance"
  type        = string
  default     = "namistore-backend"
}