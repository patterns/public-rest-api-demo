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

provider "google" {}

resource "google_project" "prj" {
  project_id      = local.project_id
  name            = local.project_id
  billing_account = var.google_billing_account

  lifecycle {
    # ignoring org_id changes allows the project to be created in whatever org
    # the user is part of by default, without having to explicitly include the
    # org id in the terraform config. is this a problem waiting to happen? only
    # time will tell.
    ignore_changes = [org_id]
  }
}

resource "google_project_service" "svc" {
  project = google_project.prj.name
  service = "${each.value}.googleapis.com"

  for_each = toset([
    "run",
  ])
}

resource "google_cloud_run_service" "app" {
  project = google_project.prj.name

  name     = "demo"
  location = var.google_cloud_region

  template {
    spec {
      containers {
        image = var.app_image

        env {
          name  = "ATLAS_URI"
          value = "${local.atlas_uri}/${var.db_name}"
        }
        env {
          name  = "JWT_SECRET"
          value = var.jwt_secret
        }
        env {
          name  = "FIREBASE_API_KEY"
          value = var.firebase_api_key
        }
        env {
          name  = "FIREBASE_AUTH_DOMAIN"
          value = var.firebase_auth_domain
        }
        env {
          name  = "FIREBASE_PROJECT_ID"
          value = var.firebase_project_id
        }
        env {
          name  = "FIREBASE_STORAGE_BUCKET"
          value = var.firebase_storage_bucket
        }
        env {
          name  = "FIREBASE_MESSAGING_SENDER_ID"
          value = var.firebase_messaging_sender_id
        }
        env {
          name  = "FIREBASE_APP_ID"
          value = var.firebase_app_id
        }

      }
    }
  }

  lifecycle {
    # this stops terraform from trying to revert to the sample app after you've
    # pushed new changes through CI
    ignore_changes = [template[0].spec[0].containers[0].image]
  }

  depends_on = [google_project_service.svc["run"]]
}

resource "google_cloud_run_service_iam_binding" "app" {
  location = google_cloud_run_service.app.location
  project  = google_cloud_run_service.app.project
  service  = google_cloud_run_service.app.name

  role    = "roles/run.invoker"
  members = ["allUsers"]
}
