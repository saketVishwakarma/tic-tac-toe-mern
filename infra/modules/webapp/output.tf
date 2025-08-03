output "app_url" {
  value = azurerm_app_service.app_service.default_site_hostname
  description = "Default hostname of the deployed App Service"
}

output "app_url_full" {
  value = "https://${azurerm_app_service.app_service.default_site_hostname}"
}
