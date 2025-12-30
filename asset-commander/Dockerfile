# ============================================
# Dockerfile - Build Multi-stage para Nginx
# ============================================
# 
# USO:
# ----
# Build da imagem:
#   docker build -t it-asset-dashboard .
#
# Executar container:
#   docker run -p 80:80 it-asset-dashboard
#
# Com variáveis de ambiente personalizadas:
#   docker run -p 80:80 \
#     -e VITE_API_BASE_URL=http://api.example.com \
#     -e VITE_USE_MOCK_DATA=false \
#     it-asset-dashboard
#

# ============================================
# Stage 1: Build
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY bun.lockb ./

# Instalar dependências
RUN npm ci --legacy-peer-deps

# Copiar código fonte
COPY . .

# Argumentos de build (podem ser sobrescritos no docker build)
ARG VITE_API_BASE_URL=http://localhost:8080/api
ARG VITE_USE_MOCK_DATA=true

# Definir variáveis de ambiente para o build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_USE_MOCK_DATA=$VITE_USE_MOCK_DATA

# Build da aplicação
RUN npm run build

# ============================================
# Stage 2: Produção com Nginx
# ============================================
FROM nginx:alpine AS production

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
