#!/bin/bash

# Definindo os nomes dos diretórios dos serviços
SERVICES=("auth-service" "user-service" "api-gateway")

# Função para iniciar um serviço
start_service() {
    local service_dir=$1
    echo "Iniciando $service_dir..."
    cd $service_dir
    # Executa o serviço em segundo plano e salva o PID
    nohup node *.service.js > "$service_dir.log" 2>&1 &
    echo "$service_dir iniciado com PID $!"
    cd ..
}

# Navega para cada diretório e inicia os serviços
for service in "${SERVICES[@]}"; do
    start_service $service
done

echo "Todos os serviços foram iniciados!"
