# Random string for unique names
resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
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
  name                = "sassoacr${random_string.suffix.result}"
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

  tags = var.tags
}

# Log Analytics Workspace for AKS monitoring
resource "azurerm_log_analytics_workspace" "aks" {
  name                = "sasso-aks-logs-${random_string.suffix.result}"
  location            = azurerm_resource_group.aks.location
  resource_group_name = azurerm_resource_group.aks.name
  sku                = "PerGB2018"
  retention_in_days   = 30

  tags = var.tags
}

# Role assignment for AKS to pull images from ACR
resource "azurerm_role_assignment" "aks_acr" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
}

# Role assignment for AKS to manage network
resource "azurerm_role_assignment" "aks_network" {
  scope                = azurerm_resource_group.aks.id
  role_definition_name = "Network Contributor"
  principal_id         = azurerm_kubernetes_cluster.aks.identity[0].principal_id
}

# Diagnostic settings for AKS
resource "azurerm_monitor_diagnostic_setting" "aks" {
  name                       = "aks-diagnostics"
  target_resource_id        = azurerm_kubernetes_cluster.aks.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.aks.id

  log {
    category = "kube-apiserver"
    enabled  = true
  }

  log {
    category = "kube-controller-manager"
    enabled  = true
  }

  log {
    category = "kube-scheduler"
    enabled  = true
  }

  log {
    category = "kube-audit"
    enabled  = true
  }

  log {
    category = "cluster-autoscaler"
    enabled  = true
  }

  metric {
    category = "AllMetrics"
    enabled  = true
  }
}
