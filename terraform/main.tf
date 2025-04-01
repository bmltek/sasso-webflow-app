resource "azurerm_resource_group" "tfstate" {
  name     = "sasso-tfstate-rg"
  location = "westeurope"
  tags = {
    environment = "dev"
    project     = "sasso-webflow"
  }
}

resource "random_string" "storage_account" {
  length  = 8
  special = false
  upper   = false
}

resource "azurerm_storage_account" "tfstate" {
  name                     = "tfstate${random_string.storage_account.result}"
  resource_group_name      = azurerm_resource_group.tfstate.name
  location                 = azurerm_resource_group.tfstate.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version         = "TLS1_2"

  blob_properties {
    versioning_enabled = true
  }

  tags = {
    environment = "dev"
    project     = "sasso-webflow"
  }
}

resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.tfstate.name
  container_access_type = "private"
}