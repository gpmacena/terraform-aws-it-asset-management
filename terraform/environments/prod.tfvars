vpc_cidr      = "10.20.0.0/16"
instance_type = "t2.micro"
ami_id        = "ami-0bde73fd629657a59"

public_subnets = {
  public-prod-a = {
    cidr = "10.20.1.0/24"
    az   = "sa-east-1a"
  }
}

# Caminho para o arquivo que contém a chave pública
public_key_path = "./environments/prod-key.pub"