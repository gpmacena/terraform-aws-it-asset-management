module "network" {
  source         = "./modules/vpc"
  vpc_cidr       = var.vpc_cidr
  public_subnets = var.public_subnets
  environment    = terraform.workspace # Adicione isso
}

module "security" {
  source      = "./modules/security"
  vpc_id      = module.network.vpc_id
  environment = terraform.workspace # Adicione isso
}

module "compute" {
  source            = "./modules/ec2"
  ami_id            = var.ami_id
  instance_type     = var.instance_type
  subnet_id         = module.network.public_subnet_ids[0]
  security_group_id = module.security.security_group_id
  key_name          = "projeto5-key-${terraform.workspace}" # Nome da chave dinâmico
  public_key        = file(var.public_key_path)
  environment       = terraform.workspace # Adicione isso
}