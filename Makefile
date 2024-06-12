.PHONY: start-client start-server

start-client:
	@echo "Starting client..."
	@cd client && npm start

start-server:
	@echo "Starting server..."
	@cd server && npm start

