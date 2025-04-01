resource "azurerm_resource_group" "tfstate" {
  name     = "sasso-tfstate-rg"
  location = "westeurope"
  tags = {
    environment = "dev"
    project     = "sasso-webflow"
  }
}

resource "azurerm_storage_account" "tfstate" {
  name                     = "tfstat56eterraform45"
  resource_group_name      = azurerm_resource_group.tfstate.name
  location                 = azurerm_resource_group.tfstate.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"

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

resource "azurerm_resource_group" "aks" {
  name     = "sasso-aks-rg"
  location = "westeurope"
  tags = {
    environment = "dev"
    project     = "sasso-webflow"
  }
}

resource "azurerm_container_registry" "acr" {
  name                = "sassoacr"
  resource_group_name = azurerm_resource_group.aks.name
  location            = azurerm_resource_group.aks.location
  sku                 = "Standard"
  admin_enabled       = true

  tags = {
    environment = "dev"
    project     = "sasso-webflow"
  }
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "sasso-aks"
  location            = azurerm_resource_group.aks.location
  resource_group_name = azurerm_resource_group.aks.name
  dns_prefix          = "sasso-aks"
  kubernetes_version  = var.kubernetes_version  # Uses 1.30.3 from variables.tf

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

resource "azurerm_role_assignment" "aks_acr" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.identity[0].principal_id
}
