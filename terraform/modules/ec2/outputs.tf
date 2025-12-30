output "public_ip" {
  value       = aws_instance.web.public_ip
  description = "IP público da instância EC2"
}

output "instance_id" {
  value       = aws_instance.web.id
}