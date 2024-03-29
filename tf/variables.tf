# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

###-----------------------------------------------------------------------------
### general config
###-----------------------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "the base name to use when creating resources. a randomized suffix will be added."
  default     = "gcp-bunelysia-demo"
}

###-----------------------------------------------------------------------------
### region config
###-----------------------------------------------------------------------------

# Please refer to https://www.mongodb.com/docs/atlas/reference/google-gcp/#std-label-google-gcp
# for a mapping of Atlas region names to Google Cloud region names. In most cases
# you should use the same region for both services.

variable "google_cloud_region" {
  type        = string
  description = "the Google Cloud region in which to create resources"
  default     = "us-west2"
}

variable "atlas_cluster_region" {
  type        = string
  description = "the Atlas region in which to create the database cluster"
  default     = "US_WEST_2"
}

variable "app_image" {
  type        = string
  description = "the fully-qualified name of your app image"
  default     = "docker.io/patterns/public-rest-api-demo:cloudrun"
}

###-----------------------------------------------------------------------------
### Google Cloud
###-----------------------------------------------------------------------------

variable "google_billing_account" {
  type        = string
  description = "the ID of your Google Cloud billing account"
}

###-----------------------------------------------------------------------------
### MongoDB Atlas
###-----------------------------------------------------------------------------

variable "atlas_cluster_tier" {
  type        = string
  description = "the tier of cluster you want to create. see the Atlas docs for details."
  default     = "M0" # M0 is the free tier
}

variable "atlas_org_id" {
  type        = string
  description = "the ID of your MongoDB Atlas organization"
}

variable "atlas_pub_key" {
  type        = string
  description = "public key for MongoDB Atlas"
}

variable "atlas_priv_key" {
  type        = string
  description = "private key for MongoDB Atlas"
}

###-----------------------------------------------------------------------------
### MongoDB database
###-----------------------------------------------------------------------------

variable "db_name" {
  type        = string
  description = "the name of the database to configure"
  default     = "bunElysiaExample"
}

variable "db_user" {
  type        = string
  description = "the username used to connect to the mongodb cluster"
  default     = "mongo"
}

variable "jwt_secret" {
  type        = string
  description = "token value the consumer sends in its Authorization Bearer header"
  default     = "toinfinityandbeyond"
}

###-----------------------------------------------------------------------------
### Firebase SDK
###-----------------------------------------------------------------------------

variable "firebase_api_key" {
  type        = string
  description = "firebase config inside the app image"
}

variable "firebase_auth_domain" {
  type        = string
  description = "firebase config inside the app image"
}

variable "firebase_project_id" {
  type        = string
  description = "firebase config inside the app image"
}

variable "firebase_storage_bucket" {
  type        = string
  description = "firebase config inside the app image"
}

variable "firebase_messaging_sender_id" {
  type        = string
  description = "firebase config inside the app image"
}

variable "firebase_app_id" {
  type        = string
  description = "firebase config inside the app image"
}