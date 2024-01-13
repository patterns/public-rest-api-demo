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

output "app_url" {
  value = google_cloud_run_service.app.status[0].url
}

output "repo_url" {
  value = google_sourcerepo_repository.repo.url
}
output "atlas_cluster_connection_string" { value = mongodbatlas_cluster.cluster.connection_strings.0.standard_srv }
output "ip_access_list"    { value = mongodbatlas_project_ip_access_list.acl.ip_address }
output "project_name"      { value = mongodbatlas_project.demo.name }
output "username"          { value = mongodbatlas_database_user.user.username } 
output "user_password"     { 
  sensitive = true
  value = mongodbatlas_database_user.user.password 
  }
