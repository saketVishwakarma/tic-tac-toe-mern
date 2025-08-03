
resource "azurerm_application_insights" "AppInsights" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
  application_type    = "web"
}
