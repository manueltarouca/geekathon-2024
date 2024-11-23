.PHONY: build apply destroy

# install dependencies
install:
	@echo "Installing dependencies..."
	cd infra/lambdas && npm install
	cd infra && terraform init

# Build Lambda functions with esbuild
build:
	@echo "Building Lambda functions..."
	cd infra/lambdas && npm run build

# Initialize Terraform and apply configuration
apply: build
	@echo "Applying Terraform configuration..."
	cd infra && terraform apply

# Destroy Terraform-managed infrastructure
destroy:
	@echo "Destroying Terraform-managed infrastructure..."
	cd infra && terraform destroy
