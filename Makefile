.PHONY: install-deps install-frontend install-auth install-resume install-vacancies start-all start-frontend start-auth start-resume start-vacancies

install-deps: install-frontend install-auth install-resume install-vacancies

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && bun install

install-auth:
	@echo "Installing auth service dependencies..."
	cd backend/auth-service && bun install

install-resume:
	@echo "Installing resume service dependencies..."
	cd backend/resume-service && bun install

install-vacancies:
	@echo "Installing vacancies service dependencies..."
	cd backend/vacancies-service && bun install

start-all: start-frontend start-auth start-resume start-vacancies

start-frontend:
	@echo "Starting frontend..."
	cd frontend && bun dev

start-auth:
	@echo "Starting auth service..."
	cd backend/auth-service && bun run dev

start-resume:
	@echo "Starting resume service..."
	cd backend/resume-service && bun run dev

start-vacancies:
	@echo "Starting vacancies service..."
	cd backend/vacancies-service && bun run dev 