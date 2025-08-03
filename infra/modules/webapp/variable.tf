
variable "app_name" {
  description = "Name of the App Service"
  type        = string
}

variable "plan_name" {
  description = "Name of the App Service Plan should be unique within the resource group"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "image_name" {
  description = "Docker image name (e.g. dockerhubuser/tictactoe)"
  type        = string
}

variable "image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}

variable "additional_settings" {
  description = "Extra app settings like App Insights keys"
  type        = map(string)
  default     = {}
}
