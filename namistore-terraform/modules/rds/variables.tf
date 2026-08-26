variable "identifier" {
  description = "RDS instance identifier"
  type        = string
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
}

variable "username" {
  description = "PostgreSQL master username"
  type        = string
}

variable "password" {
  description = "PostgreSQL master password"
  type        = string
  sensitive   = true
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for RDS"
  type        = list(string)
}

variable "database_security_group_id" {
  description = "Security group ID for RDS"
  type        = string
}