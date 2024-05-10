variable "postgres_user" {
  sensitive = true
}
variable "postgres_password" {
  sensitive = true
}
variable "jwt_private_key" {
  sensitive = true
}
variable "jwt_public_key" {
  sensitive = true
}
variable "resend_api_key" {
  sensitive = true
}
variable "redis_password" {
  sensitive = true
}
variable "jwt_expire" {}
variable "jwt_algorithm" {}
variable "environment" {}
variable "gcp_bucket_name" {}
variable "project_id" {}
variable "gcp_private_key_id" {
  sensitive = true
}
variable "gcp_client_email" {
  sensitive = true
}
variable "gcp_client_id" {
  sensitive = true
}
variable "gcp_credentials_private_key" {
  sensitive = true
}
variable "region" {
  default = "europe-west1"
}

variable "allowed_ips" {}