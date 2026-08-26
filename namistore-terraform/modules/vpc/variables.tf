variable "vpc_cidr" {
  description = "CIDR block for the Namistore VPC"
  type        = string
}

variable "availability_zones" {
  description = "Availability Zones to use for the VPC"
  type        = list(string)
}