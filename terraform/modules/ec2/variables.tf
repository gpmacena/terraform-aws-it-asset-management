variable "ami_id" {
  type        = string
  description = "AMI ID para a instância"
}

variable "instance_type" {
  type        = string
  description = "Tipo da instância (ex: t3.micro)"
}

variable "subnet_id" {
  type        = string
  description = "ID da Subnet onde a instância será criada"
}

variable "security_group_id" {
  type        = string
  description = "ID do Security Group"
}

variable "key_name" {
  type        = string
  description = "Nome base da chave SSH"
}

variable "public_key" {
  type        = string
  description = "Conteúdo da chave pública (lido via função file no main raiz)"
}

variable "environment" {
  type        = string
}