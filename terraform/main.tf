# Random string for unique names
resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

# Create new resource group if create_resource_group is true
resource "azurerm_resource_group" "aks" {
  count    = var.create_resource_group ? 1 : 0
  name     = "${var.prefix}-${var.environment}-rg"
  location = var.location
  tags     = merge(var.tags, {
    environment = var.environment
  })
}

# Use existing resource group if create_resource_group is false
data "azurerm_resource_group" "existing_aks" {
  count = var.create_resource_group ? 0 : 1
  name  = "${var.prefix}-${var.environment}-rg"
}

# Local variable to use the correct resource group reference
locals {
  resource_group_name     = var.create_resource_group ? azurerm_resource_group.aks[0].name : data.azurerm_resource_group.existing_aks[0].name
  resource_group_location = var.create_resource_group ? azurerm_resource_group.aks[0].location : data.azurerm_resource_group.existing_aks[0].location
  resource_group_id      = var.create_resource_group ? azurerm_resource_group.aks[0].id : data.azurerm_resource_group.existing_aks[0].id
}

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "${var.prefix}acr${random_string.suffix.result}"
  resource_group_name = local.resource_group_name
  location            = local.resource_group_location
  sku                 = "Standard"
  admin_enabled       = true
  tags               = merge(var.tags, {
    environment = var.environment
  })
}

# Azure Kubernetes Service
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.prefix}-${var.environment}-aks"
  location            = local.resource_group_location
  resource_group_name = local.resource_group_name
  dns_prefix          = "${var.prefix}-${var.environment}-aks"
  kubernetes_version  = var.kubernetes_version

  default_node_pool {
    name                = "default"
    node_count          = var.node_count
    vm_size            = var.vm_size
    enable_auto_scaling = true
    min_count          = var.min_node_count
    max_count          = var.max_node_count
    os_disk_size_gb    = 50
    type               = "VirtualMachineScaleSets"
    zones              = ["2"]
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
    network_policy    = "azure"
  }

  oms_agent {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.aks.id
  }

  depends_on = [
    azurerm_container_registry.acr
  ]

  tags = merge(var.tags, {
    environment = var.environment
  })
}

# Log Analytics Workspace for AKS monitoring
resource "azurerm_log_analytics_workspace" "aks" {
  name                = "${var.prefix}-${var.environment}-logs-${random_string.suffix.result}"
  location            = local.resource_group_location
  resource_group_name = local.resource_group_name
  sku                = "PerGB2018"
  retention_in_days   = 30
  tags               = merge(var.tags, {
    environment = var.environment
  })
}

# Role assignment for AKS to pull images from ACR
resource "azurerm_role_assignment" "aks_acr" {
  count                = var.assign_roles ? 1 : 0
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
}

# Role assignment for AKS to manage network
resource "azurerm_role_assignment" "aks_network" {
  count                = var.assign_roles ? 1 : 0
  scope                = local.resource_group_id
  role_definition_name = "Network Contributor"
  principal_id         = azurerm_kubernetes_cluster.aks.identity[0].principal_id
}

# Diagnostic settings for AKS
resource "azurerm_monitor_diagnostic_setting" "aks" {
  name                       = "aks-diagnostics"
  target_resource_id        = azurerm_kubernetes_cluster.aks.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.aks.id

  enabled_log {
    category_group = "allLogs"
  }

  metric {
    category = "AllMetrics"
    enabled  = true
  }
}
