provider "google" {
  project = var.project_id
  region  = var.region
}

// cloud run instance
resource "google_cloud_run_v2_service" "whizzle-api-cloud-run" {
  name     = "whizzle-api-cloud-run"
  location = google_compute_subnetwork.default.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    vpc_access {
      connector = google_vpc_access_connector.default.id
      egress    = "ALL_TRAFFIC"
    }

    scaling {
      max_instance_count = 1
      min_instance_count = 1
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.main.connection_name]
      }
    }

    containers {
      startup_probe {
        http_get {
          path = "/health-check"
          port = 8080
        }
        failure_threshold     = 10
        initial_delay_seconds = 10
        period_seconds        = 15
        timeout_seconds       = 10
      }
      image = "gcr.io/whizzle-prod/whizzle-api:1"

      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }
      env {
        name  = "MOCK_EMAILS"
        value = "false"
      }
      env {
        name  = "RESEND_API_KEY"
        value = var.resend_api_key
      }
      env {
        name  = "POSTGRES_USER"
        value = var.postgres_user
      }
      env {
        name  = "POSTGRES_PASSWORD"
        value = var.postgres_password
      }
      env {
        name  = "POSTGRES_DB"
        value = var.postgres_db
      }
      env {
        name  = "DB_HOST"
        value = google_sql_database_instance.main.public_ip_address
      }
      env {
        name  = "DB_PORT"
        value = var.postgres_db_port
      }
      env {
        name  = "DB_SCHEMA"
        value = var.postgres_db_schema
      }
      env {
        name = "REDIS_HOST"
        value = google_redis_instance.cache.host
      }
      env {
        name = "REDIS_PORT"
        value = google_redis_instance.cache.port
      }
      env {
        name  = "REDIS_PASSWORD"
        value = var.redis_password
      }
      env {
        name  = "JWT_PRIVATE_KEY"
        value = var.jwt_private_key
      }
      env {
        name  = "JWT_PUBLIC_KEY"
        value = var.jwt_public_key
      }
      env {
        name  = "JWT_EXPIRE"
        value = var.jwt_expire
      }
      env {
        name  = "JWT_ALGORITHM"
        value = var.jwt_algorithm
      }
      env {
        name  = "ENVIRONMENT"
        value = var.environment
      }
      env {
        name  = "GCP_PROJECT_ID"
        value = var.project_id
      }
      env {
        name  = "GCP_PRIVATE_KEY_ID"
        value = var.gcp_private_key_id
      }
      env {
        name  = "GCP_CREDENTIALS_PRIVATE_KEY"
        value = var.gcp_credentials_private_key
      }
      env {
        name  = "GCP_CLIENT_EMAIL"
        value = var.gcp_client_email
      }
      env {
        name  = "GCP_CLIENT_ID"
        value = var.gcp_client_id
      }
      env {
        name  = "GCP_BUCKET_NAME"
        value = var.gcp_bucket_name
      }

    }
    timeout = "40s"

  }
}
resource "google_cloud_run_domain_mapping" "default" {
  location = google_compute_subnetwork.default.region
  name     = "api.whizzle.app"
  metadata {
    namespace = "whizzle-prod"
  }

  spec {
    route_name = google_cloud_run_v2_service.whizzle-api-cloud-run.name
  }
}


// allow public access to cloud run
resource "google_cloud_run_service_iam_binding" "default" {
  location = google_cloud_run_v2_service.whizzle-api-cloud-run.location
  service  = google_cloud_run_v2_service.whizzle-api-cloud-run.name
  role     = "roles/run.invoker"
  members  = [
    "allUsers"
  ]
}

resource "google_project_service" "vpc" {
  service            = "vpcaccess.googleapis.com"
  disable_on_destroy = false
}

// vps & nat gateway setup
resource "google_vpc_access_connector" "default" {
  name   = "whizzle-connector"
  region = var.region

  subnet {
    name = google_compute_subnetwork.default.name
  }

  depends_on = [
    google_project_service.vpc,
    google_compute_subnetwork.default
  ]
}

resource "google_compute_network" "default" {
  name = "whizzle-subnet-network"
}

resource "google_compute_subnetwork" "default" {
  name          = "whizzle-subnet-static-ip"
  ip_cidr_range = "10.124.0.0/28"
  network       = google_compute_network.default.id
  region        = var.region
}

resource "google_compute_router" "default" {
  name    = "whizzle-static-ip-router"
  network = google_compute_network.default.name
  region  = google_compute_subnetwork.default.region
}

resource "google_compute_address" "default" {
  name   = "whizzle-static-ip-addr"
  region = google_compute_subnetwork.default.region
}

resource "google_compute_router_nat" "default" {
  name   = "whizzle-static-nat-gw"
  router = google_compute_router.default.name
  region = google_compute_subnetwork.default.region

  nat_ip_allocate_option = "MANUAL_ONLY"
  nat_ips                = [google_compute_address.default.self_link]

  source_subnetwork_ip_ranges_to_nat = "LIST_OF_SUBNETWORKS"
  subnetwork {
    name                    = google_compute_subnetwork.default.id
    source_ip_ranges_to_nat = ["ALL_IP_RANGES"]
  }
}

output "url" {
  value = google_cloud_run_v2_service.whizzle-api-cloud-run.uri
}

