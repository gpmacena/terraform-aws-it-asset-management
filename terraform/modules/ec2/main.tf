resource "aws_key_pair" "this" {
  key_name   = "${var.key_name}-${terraform.workspace}"
  public_key = var.public_key  
}

resource "aws_instance" "web" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = [var.security_group_id]
  # Mesmo sem a chave física, mantenha a referência se ela existir no código
  key_name               = aws_key_pair.this.key_name 

  # Script de automação total para Ubuntu
  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              
              # Instalação do Docker
              apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io
              
              # Adiciona o usuário ubuntu ao grupo docker para a pipeline SSH funcionar sem travar
              usermod -aG docker ubuntu
              systemctl enable docker
              systemctl start docker

              # --- Seu script original do Node Exporter ---
              cd /tmp
              wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz
              tar xvfz node_exporter-1.7.0.linux-amd64.tar.gz
              mv node_exporter-1.7.0.linux-amd64/node_exporter /usr/local/bin/

              cat <<SERVICE > /etc/systemd/system/node_exporter.service
              [Unit]
              Description=Node Exporter
              After=network.target

              [Service]
              User=ubuntu
              ExecStart=/usr/local/bin/node_exporter
              Restart=always

              [Install]
              WantedBy=multi-user.target
              SERVICE

              systemctl daemon-reload
              systemctl enable node_exporter
              systemctl start node_exporter
              EOF

  tags = {
    Name      = "server-${terraform.workspace}"
    Env       = var.environment
    monitorar = "true" 
  }
}