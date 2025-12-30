variable "vpc_cidr" {
  description = "Bloco CIDR da VPC"
  type        = string
}

variable "public_subnets" {
  description = "Mapa de subnets públicas"
  type = map(object({
    cidr = string
    az   = string
  }))
}

variable "instance_type" {
  type        = string
  description = "Tipo da instância EC2"

  validation {
    condition = (
      terraform.workspace == "dev" ? 
      contains(["t3.micro", "t3.small"], var.instance_type) : 
      true
    )
    error_message = "Erro de Governança: Em DEV não é permitido usar instâncias superiores a t3.small."
  }
}

variable "ami_id" {
  type        = string
}

variable "public_key_path" {
  type        = string
}

variable "environment" {
  description = "Ambiente atual vindo do workspace"
  type        = string
  default     = ""
}

variable "project_name" {
  default = "it-asset-app"
}