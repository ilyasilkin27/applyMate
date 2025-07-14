.PHONY: install install-frontend install-backend install-all dev dev-frontend dev-backend build build-frontend build-backend clean

# Установка всех зависимостей
install-all: install-frontend install-backend

# Установка зависимостей фронтенда
install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && bun install

# Установка зависимостей бэкенда (все сервисы)
install-backend:
	@echo "Installing auth-service dependencies..."
	cd backend/auth-service && bun install
	@echo "Installing resume-service dependencies..."
	cd backend/resume-service && bun install
	@echo "Installing vacancies-service dependencies..."
	cd backend/vacancies-service && bun install

# Запуск всех сервисов в режиме разработки
dev: dev-backend dev-frontend

# Запуск фронтенда в режиме разработки
dev-frontend:
	@echo "Starting frontend development server..."
	cd frontend && bun run dev

# Запуск всех бэкенд сервисов через docker-compose
dev-backend:
	@echo "Starting backend services with docker-compose..."
	cd backend && docker-compose up -d

# Сборка всех проектов
build: build-frontend build-backend

# Сборка фронтенда
build-frontend:
	@echo "Building frontend..."
	cd frontend && bun run build

# Сборка бэкенд сервисов
build-backend:
	@echo "Building backend services..."
	cd backend && docker-compose build

# Очистка
clean:
	@echo "Cleaning up..."
	cd frontend && rm -rf node_modules dist
	cd backend/auth-service && rm -rf node_modules
	cd backend/resume-service && rm -rf node_modules
	cd backend/vacancies-service && rm -rf node_modules
	cd backend && docker-compose down --volumes --remove-orphans

# Остановка всех сервисов
stop:
	@echo "Stopping all services..."
	cd backend && docker-compose down

# Просмотр логов
logs:
	@echo "Showing logs..."
	cd backend && docker-compose logs -f

# Помощь
help:
	@echo "Available commands:"
	@echo "  install-all     - Install all dependencies (frontend + backend)"
	@echo "  install-frontend - Install frontend dependencies"
	@echo "  install-backend  - Install backend dependencies"
	@echo "  dev             - Start all services in development mode"
	@echo "  dev-frontend    - Start frontend development server"
	@echo "  dev-backend     - Start backend services with docker-compose"
	@echo "  build           - Build all projects"
	@echo "  build-frontend  - Build frontend"
	@echo "  build-backend   - Build backend services"
	@echo "  clean           - Clean all node_modules and docker containers"
	@echo "  stop            - Stop all services"
	@echo "  logs            - Show docker-compose logs"
	@echo "  help            - Show this help message" 