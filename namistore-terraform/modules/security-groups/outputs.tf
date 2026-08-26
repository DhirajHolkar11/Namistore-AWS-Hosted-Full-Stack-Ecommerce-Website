output "frontend_security_group_id" {
  description = "Security group ID for the frontend"
  value       = aws_security_group.frontend.id
}

output "backend_security_group_id" {
  description = "Security group ID for the backend"
  value       = aws_security_group.backend.id
}

output "database_security_group_id" {
  description = "Security group ID for the database"
  value       = aws_security_group.database.id
}