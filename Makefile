.PHONY: help deploy destroy plan init
.DEFAULT_GOAL := help

help:
	@echo "Frontend Infrastructure Makefile"
	@echo "  make init      - Initialize Terraform"
	@echo "  make plan      - Plan Terraform changes"
	@echo "  make deploy    - Apply Terraform changes"
	@echo "  make destroy   - Destroy Terraform resources"

init:
	cd terraform && terraform init

plan:
	cd terraform && terraform plan -out=.tfplan

deploy:
	@test -f terraform/.tfplan || (echo "Run 'make plan' first" && exit 1)
	cd terraform && terraform apply .tfplan
	
destroy:
	@echo "This will DESTROY frontend infrastructure!"
	@read -p "Type 'yes' to continue: " confirm && \
	[ "$$confirm" = "yes" ] && \
	cd terraform && terraform destroy

