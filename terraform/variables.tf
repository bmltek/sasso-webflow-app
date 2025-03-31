variable "prefix" {
  description = "A prefix used for all resources"
  type        = string
  default     = "microflow"
}

variable "location" {
  description = "The Azure Region in which all resources should be created."
  type        = string
  default     = "eastus"
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.28"
}

variable "node_count" {
  description = "The initial number of nodes which should exist in the Node Pool"
  type        = number
  default     = 2
}

variable "min_node_count" {
  description = "The minimum number of nodes which should exist in the Node Pool"
  type        = number
  default     = 1
}

variable "max_node_count" {
  description = "The maximum number of nodes which should exist in the Node Pool"
  type        = number
  default     = 10
}

variable "vm_size" {
  description = "The size of the Virtual Machine"
  type        = string
  default     = "Standard_D2s_v3"
}

variable "tags" {
  description = "A mapping of tags to assign to the resource"
  type        = map(string)
  default = {
    Environment = "Production"
    Project     = "Microflow"
  }
}