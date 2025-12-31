# 🛡️ IT Asset Management & Governance System

![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Este repositório contém uma solução completa de **Gerenciamento de Ativos de TI**, integrando uma aplicação moderna em React com uma infraestrutura escalável e automatizada na AWS através de práticas de **Infrastructure as Code (IaC)** e **CI/CD Pipeline**.

---

## 🚀 Visão Geral do Projeto

A solução foi projetada para oferecer governança total sobre o ciclo de vida de ativos tecnológicos, permitindo o provisionamento, monitoramento e destruição de recursos de forma controlada através de ambientes de **Desenvolvimento (Dev)** e **Produção (Prod)**.

### 1. Aplicação Frontend (`asset-commander`)
Desenvolvida com o que há de mais moderno no ecossistema React:
* **Vite + React + TypeScript**: Garantindo performance e segurança de tipos.
* **Tailwind CSS + Shadcn/UI**: Design system baseado em tokens semânticos com suporte nativo a temas (Dark Mode).
* **TanStack React Query**: Gerenciamento de estado assíncrono e cache inteligente.
* **Dockerizada**: Container otimizado com build multi-stage e servidor Nginx configurado para SPAs.

### 2. Infraestrutura como Código (`terraform`)
Infraestrutura modularizada e resiliente na AWS:
* **VPC & Networking**: Criação de redes isoladas e subnets públicas.
* **Compute (EC2)**: Instâncias Ubuntu com provisionamento automatizado via `user_data`.
* **Security Groups**: Regras de firewall rígidas permitindo apenas tráfego essencial (portas 22, 80 e 9100).
* **Workspaces**: Isolamento completo entre ambientes `dev` e `prod` via Terraform Workspaces.

---

## ⛓️ Pipeline de CI/CD & Governança Enterprise

O workflow do **GitHub Actions** foi desenhado para atuar como uma central de controle (Governance Enterprise):

### Fluxo de Operação:
1.  **Gatilho Manual (Workflow Dispatch)**: Escolha entre as ações de `apply` ou `destroy` diretamente na interface do GitHub.
2.  **Provisionamento**: O Terraform inicializa o workspace correto e aplica as configurações baseadas no ambiente selecionado.
3.  **Build Docker**: A imagem do dashboard é gerada injetando variáveis de ambiente específicas.
4.  **Deploy via SSH**: Conexão automática à instância EC2 para pull da nova imagem e reinício do serviço.

---

## 🛠️ O que mais foi utilizado?

Além das tecnologias principais, o projeto implementa:

* **Node Exporter**: Instalado via script de automação (`user_data`) para expor métricas de hardware da VM na porta `9100`.
* **Nginx**: Utilizado como servidor de arquivos estáticos dentro do container Docker para servir o build do React.
* **SSH RSA Keys**: Par de chaves dinâmico para garantir o acesso seguro da pipeline à instância AWS.
* **Shell Scripting**: Automação de processos internos durante a inicialização da instância (instalação de Docker e dependências).

---

## ⚙️ Configuração e Instalação

### Secrets Necessárias no GitHub (Actions Secrets)
Configure os seguintes segredos nos **Environments** (`development` e `production`):

* `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`
* `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN`
* `SSH_PRIVATE_KEY`: Conteúdo da chave privada `.pem`.
* `API_URL`: URL de backend para integração.

---

## 📊 Status do Sistema
Atualmente, o dashboard opera com dados **Mockados** para fins de demonstração da interface. A governança de infraestrutura está 100% funcional através da aba "Actions".

---

> **Projeto desenvolvido como demonstração técnica de competências em Cloud Architecture, DevOps e Software Engineering.**