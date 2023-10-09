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
### configure terraform
###-----------------------------------------------------------------------------

terraform {
  required_version = ">= 0.13"

  required_providers {
    mongodbatlas = {
      ##version = "~> 1.4.5"
      source  = "mongodb/mongodbatlas"
    }
  }
}

###-----------------------------------------------------------------------------
### shared config
###-----------------------------------------------------------------------------

resource "random_string" "mongodb_password" {
  length  = 32
  special = false
  upper   = true
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

locals {
  project_id = "${var.project_name}-${random_string.suffix.result}"
}
