output "instance_id" {
  description = "ID of the Namistore backend EC2 instance"
  value       = aws_instance.backend.id
}

output "public_ip" {
  description = "Public IP address of the Namistore backend EC2 instance"
  value       = aws_instance.backend.public_ip
}

output "private_ip" {
  description = "Private IP address of the Namistore backend EC2 instance"
  value       = aws_instance.backend.private_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the Namistore backend EC2 instance"
  value       = aws_instance.backend.public_dns
}