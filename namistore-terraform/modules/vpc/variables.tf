variable "vpc_cidr" {
  description = "CIDR block for the Namistore VPC"
  type        = string
}

variable "availability_zones" {
  description = "Availability Zones to use for the VPC"
  type        = list(string)
}

variable "enable_nat_gateway" {
  description = "Whether to create the NAT Gateway and its Elastic IP"
  type        = bool
  default     = true
}
