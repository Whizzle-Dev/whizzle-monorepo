resource "google_storage_bucket" "whizzle-prod-bucket" {
  name          = var.gcp_bucket_name
  location      = google_compute_subnetwork.default.region
  force_destroy = true

  cors {
    origin          = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}