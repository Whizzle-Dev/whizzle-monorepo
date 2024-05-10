// redis instance
resource "google_redis_instance" "cache" {
  region         = "europe-west1"
  name           = "whizzle-cache"
  tier           = "BASIC"
  memory_size_gb = 1

  authorized_network = google_compute_network.default.id
  connect_mode       = "DIRECT_PEERING"

  display_name = "Whizzle Cache Instance"

  lifecycle {
    prevent_destroy = false
  }
}