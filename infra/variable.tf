
variable "resource_group_name" {
  description = "Name of the Azure resource group"
  type        = string
}

variable "location" {
  description = "Azure region for deployment"
  type        = string
  default     = "East US"
}

variable "app_name" {
  description = "Name prefix for App Service and related resources"
  type        = string
}

variable "dockerhub_username" {
  description = "Docker Hub username to pull the image"
  type        = string
}
variable "tenant_id" {
    description = "Azure Tenant ID for authentication"
    type        = string
  
}
variable "subscription_id" {
    description = "Azure Subscription ID for resource management"
    type        = string
  
}
variable "client_id" {
    description = "Azure Client ID for authentication"
    type        = string
}
