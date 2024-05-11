variable "postgres_user" {
  sensitive = true
  type      = string
}
variable "postgres_db" {
  type = string
}
variable "postgres_db_schema" {
  type = string
}
variable "postgres_password" {
  sensitive = true
  type      = string
}
variable "postgres_db_port" {
  sensitive = true
  type      = string
}
variable "jwt_private_key" {
  sensitive = true
  type      = string
}
variable "jwt_public_key" {
  sensitive = true
  type      = string
}
variable "resend_api_key" {
  sensitive = true
  type      = string
}
variable "redis_password" {
  sensitive = true
  type      = string
}
variable "jwt_expire" {
  type = string
}
variable "jwt_algorithm" {
  type = string
}
variable "environment" {
  type = string
}
variable "gcp_bucket_name" {
  type = string
}
variable "project_id" {
  type = string
}
variable "gcp_private_key_id" {
  sensitive = true
  type      = string
}
variable "gcp_client_email" {
  sensitive = true
  type      = string
}
variable "gcp_client_id" {
  sensitive = true
  type      = string
}
variable "gcp_credentials_private_key" {
  sensitive = true
  type      = string
}
variable "region" {
  default = "europe-west1"
}

variable "allowed_ips" {}
