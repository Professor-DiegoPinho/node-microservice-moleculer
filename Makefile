# Definindo os nomes dos diretórios dos serviços
SERVICES = auth-service user-service api-gateway

# Alvo para iniciar todos os serviços
start: $(SERVICES)

$(SERVICES):
	@echo "Iniciando $@..."
	@cd $@ && nohup node *.service.js > "$@.log" 2>&1 &
	@echo "$@ iniciado."

# Alvo para parar todos os serviços
stop:
	@$(foreach service,$(SERVICES),\
		echo "Parando $(service)..."; \
		pid=$$(ps aux | grep "[n]ode .*$$(pwd)/$(service)" | awk '{print $$2}'); \
		if [ -n "$$pid" ]; then \
			kill $$pid; \
			echo "$(service) parado."; \
		else \
			echo "Nenhum processo encontrado para $(service)."; \
		fi; \
	)

# Limpar arquivos de log
clean:
	@$(foreach service,$(SERVICES),\
		echo "Limpando logs de $(service)..."; \
		rm -f $(service)/$(service).log; \
		echo "Logs de $(service) limpos."; \
	)
