resource "google_sql_database_instance" "main" {
  name                = "whizzle-api-db"
  database_version    = "POSTGRES_15"
  region              = "europe-west1"
  deletion_protection = false


  settings {
    tier                        = "db-f1-micro"
    availability_type           = "ZONAL"
    deletion_protection_enabled = false
    disk_size                   = 10
    disk_type                   = "PD_HDD"
    disk_autoresize             = false

    ip_configuration {
      enable_private_path_for_google_cloud_services = false
      ipv4_enabled                                  = true
      require_ssl                                   = false

      authorized_networks {
        name  = "Cloud Run"
        value = google_compute_address.default.address
      }
      dynamic "authorized_networks" {
        for_each = var.allowed_ips
        content {
          name  = "Authorized network"
          value = authorized_networks.value
        }
      }
    }
  }
}

resource "google_sql_user" "postgres" {
  name     = "whizzle-api"
  password = var.postgres_password
  instance = google_sql_database_instance.main.name

  deletion_policy = "ABANDON"
}