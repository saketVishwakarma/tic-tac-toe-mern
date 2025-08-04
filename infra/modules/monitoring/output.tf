
output "instrumentation_key" {
  value = azurerm_application_insights.AppInsights.instrumentation_key
  sensitive= true
}

output "connection_string" {
  value = azurerm_application_insights.AppInsights.connection_string
  sensitive= true
}
