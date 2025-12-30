vpc_cidr      = "10.10.0.0/16"
instance_type = "t3.small"
ami_id        = "ami-0bde73fd629657a59"

public_subnets = {
  public-dev-a = {
    cidr = "10.10.1.0/24"
    az   = "sa-east-1a"
  }
}

public_key_path = "./environments/dev-key.pub"