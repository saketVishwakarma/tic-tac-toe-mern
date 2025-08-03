# outputs.tf (root)

output "app_url" {
  description = "Default hostname of the deployed App Service"
  value       = module.webapp.app_url
}

output "app_url_full" {
  description = "Full HTTPS URL of the deployed App"
  value       = module.webapp.app_url_full
}

output "instrumentation_key" {
  description = "App Insights instrumentation key"
  value       = module.appinsights.instrumentation_key
}

output "connection_string" {
  description = "App Insights connection string"
  value       = module.appinsights.connection_string
}
