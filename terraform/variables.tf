variable "prefix" {
  description = "Prefix for all resources"
  default     = "sasso"
}

variable "location" {
  description = "Azure region"
  default     = "eastus"
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  default     = "1.27.7"
}

variable "node_count" {
  description = "Number of AKS nodes"
  default     = 3
}

variable "min_node_count" {
  description = "Minimum number of nodes"
  default     = 1
}

variable "max_node_count" {
  description = "Maximum number of nodes"
  default     = 5
}

variable "vm_size" {
  description = "VM size"
  default     = "Standard_DS2_v2"
}

variable "tags" {
  description = "Tags for resources"
  type        = map(string)
  default     = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}