#!/bin/bash

# Definindo os nomes dos diretórios dos serviços
SERVICES=("auth-service" "user-service" "api-gateway")

# Função para parar um serviço
stop_service() {
    local service_dir=$1
    echo "Parando $service_dir..."
    
    # Obtém o PID do processo a partir do arquivo nohup
    pid=$(ps aux | grep "[n]ode .*$service_dir" | awk '{print $2}')

    if [ -n "$pid" ]; then
        kill $pid
        echo "$service_dir parado."
    else
        echo "Nenhum processo encontrado para $service_dir."
    fi
}

# Navega para cada diretório e para os serviços
for service in "${SERVICES[@]}"; do
    stop_service $service
done

echo "Todos os serviços foram parados!"
