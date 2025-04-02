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

# Random string for unique names
resource "random_string" "storage_account" {
  length  = 8
  special = false
  upper   = false
}

# Azure Kubernetes Service
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "sasso-aks"
  location            = azurerm_resource_group.aks.location
  resource_group_name = azurerm_resource_group.aks.name
  dns_prefix          = "sasso-aks"
  kubernetes_version  = var.kubernetes_version

  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.vm_size
  }

  identity {
    type = "SystemAssigned"
  }

  tags = var.tags
}

# Role assignment for AKS to pull images from ACR
resource "azurerm_role_assignment" "aks_acr" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.identity[0].principal_id
}
