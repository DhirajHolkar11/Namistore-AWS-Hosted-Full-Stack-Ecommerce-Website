output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = module.rds.endpoint
}

output "rds_port" {
  description = "RDS PostgreSQL port"
  value       = module.rds.port
}

output "rds_database_name" {
  description = "RDS PostgreSQL database name"
  value       = module.rds.database_name
}

output "backend_ec2_instance_id" {
  description = "ID of the Namistore backend EC2 instance"
  value       = module.ec2.instance_id
}

output "backend_ec2_public_ip" {
  description = "Public IP address of the Namistore backend EC2 instance"
  value       = module.ec2.public_ip
}

output "backend_repository_url" {
  value = module.ecr.backend_repository_url
}

output "frontend_repository_url" {
  value = module.ecr.frontend_repository_url
}