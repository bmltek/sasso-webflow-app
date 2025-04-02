terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "sasso-tfstate-rg"
    storage_account_name = "tfstat56eterraform45"
    container_name       = "tfstate"
    key                 = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
  subscription_id = "a14b6cfe-8553-4b23-b354-d5602f0f84aa"
}