# main.tf (root)
resource "azurerm_resource_group" "Rg" {
  name     = var.resource_group_name
  location = var.location
}

module "appinsights" {
  source              = "./modules/monitoring"
  name                = "${var.app_name}-insights"
  location            = var.location
  resource_group_name = azurerm_resource_group.Rg.name
}

module "webapp" {
  source              = "./modules/webapp"
  app_name            = var.app_name
  plan_name           = "${var.app_name}-plan"
  location            = var.location
  resource_group_name = azurerm_resource_group.Rg.name
  image_name          = "${var.dockerhub_username}/tictactoe"
  image_tag           = "latest"

  additional_settings = {
    APPINSIGHTS_INSTRUMENTATIONKEY        = module.appinsights.instrumentation_key
    APPLICATIONINSIGHTS_CONNECTION_STRING = module.appinsights.connection_string
  }
}
