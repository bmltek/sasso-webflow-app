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

# AKS Resource Group
resource "azurerm_resource_group" "aks" {
  name     = "sasso-aks-rg"
  location = "westeurope"
  tags = {
    environment = "dev"
    project     = "sasso-webflow"
  }
}

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "sassoacr${random_string.storage_account.result}"
  resource_group_name = azurerm_resource_group.aks.name
  location            = azurerm_resource_group.aks.location
  sku                 = "Standard"
  admin_enabled       = true

  tags = {
    environment = "dev"
    project     = "sasso-webflow"
  }
}

# Azure Kubernetes Service
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "sasso-aks"
  location            = azurerm_resource_group.aks.location
  resource_group_name = azurerm_resource_group.aks.name
  dns_prefix          = "sasso-aks"
  kubernetes_version  = "1.24.9"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = "dev"
    project     = "sasso-webflow"
  }
}

# Role assignment for AKS to pull images from ACR
resource "azurerm_role_assignment" "aks_acr" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.identity[0].principal_id
}