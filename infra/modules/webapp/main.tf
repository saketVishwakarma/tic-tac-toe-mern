resource "azurerm_app_service_plan" "app_service_plan" {
  name                = var.plan_name
  location            = var.location
  resource_group_name = var.resource_group_name
  kind                = "Linux"
  reserved            = true

  sku {
  tier = "Basic"
  size = "B1"
}
}

resource "azurerm_app_service" "app_service" {
  name                = var.app_name
  location            = var.location
  resource_group_name = var.resource_group_name
  app_service_plan_id = azurerm_app_service_plan.app_service_plan.id

  site_config {
    linux_fx_version  = "DOCKER|${var.image_name}:${var.image_tag}"
    always_on         = false
    health_check_path = "/"
  }

  app_settings = merge(
    {
      WEBSITES_PORT = "3000"
    },
    var.additional_settings
  )
}