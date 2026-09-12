output "frontend_security_group_id" {
  description = "Security group ID for the frontend"
  value       = aws_security_group.frontend.id
}



output "database_security_group_id" {
  description = "Security group ID for the database"
  value       = aws_security_group.database.id
}

output "jenkins_security_group_id" {
  value = aws_security_group.jenkins.id
}