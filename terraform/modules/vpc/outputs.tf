output "vpc_id" {
  description = "ID da VPC criada"
  value       = aws_vpc.this.id
}

output "public_subnet_ids" {
  description = "Lista de IDs das subnets públicas"
  value       = [for s in aws_subnet.public : s.id]
}