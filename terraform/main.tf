resource "azurerm_resource_group" "aks" {
  name     = "${var.prefix}-rg"
  location = var.location
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.prefix}-aks"
  location            = azurerm_resource_group.aks.location
  resource_group_name = azurerm_resource_group.aks.name
  dns_prefix          = "${var.prefix}-aks"
  kubernetes_version  = var.kubernetes_version

  default_node_pool {
    name                = "default"
    node_count          = var.node_count
    vm_size             = var.vm_size
    enable_auto_scaling = true
    min_count          = var.min_node_count
    max_count          = var.max_node_count
    os_disk_size_gb    = 50
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
  }

  auto_scaler_profile {
    scale_down_delay_after_add = "15m"
    scale_down_unneeded       = "15m"
  }

  tags = var.tags
}

resource "azurerm_monitor_diagnostic_setting" "aks" {
  name                       = "aks-diagnostics"
  target_resource_id        = azurerm_kubernetes_cluster.aks.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.aks.id

  log {
    category = "kube-apiserver"
    enabled  = true
  }

  log {
    category = "kube-audit"
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
    category = "cluster-autoscaler"
    enabled  = true
  }

  metric {
    category = "AllMetrics"
    enabled  = true
  }
}

resource "azurerm_log_analytics_workspace" "aks" {
  name                = "${var.prefix}-law"
  location            = azurerm_resource_group.aks.location
  resource_group_name = azurerm_resource_group.aks.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# Add ACR role assignment for AKS
resource "azurerm_role_assignment" "aks_acr" {
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                           = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}