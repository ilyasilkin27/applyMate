.PHONY: install-deps install-frontend install-auth install-resume install-vacancies

install-deps: install-frontend install-auth install-resume install-vacancies

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

install-auth:
	@echo "Installing auth service dependencies..."
	cd backend/auth-service && npm install

install-resume:
	@echo "Installing resume service dependencies..."
	cd backend/resume-service && npm install

install-vacancies:
	@echo "Installing vacancies service dependencies..."
	cd backend/vacancies-service && npm install 