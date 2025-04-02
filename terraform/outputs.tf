output "resource_group_name" {
  value = local.resource_group_name
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

output "aks_cluster_host" {
  value = azurerm_kubernetes_cluster.aks.kube_config[0].host
  sensitive = true
}

output "acr_name" {
  value = azurerm_container_registry.acr.name
}