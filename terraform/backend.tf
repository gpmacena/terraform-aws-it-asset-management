terraform {
  backend "s3" {
    bucket  = "gabrielmacena-terraform-states"
    key     = "projetos/it-asset-management/terraform.tfstate"
    region  = "sa-east-1"
    encrypt = true
  }
}