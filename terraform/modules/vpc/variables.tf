variable "vpc_cidr" {
  type        = string
  description = "Bloco CIDR da VPC"
}

variable "public_subnets" {
  type = map(object({
    cidr = string
    az   = string
  }))
  description = "Mapa de subnets públicas"
}

variable "environment" {
  type        = string
}