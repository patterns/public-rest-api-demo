# Outputs to Display
output "atlas_cluster_connection_string" { value = mongodbatlas_cluster.cluster.connection_strings.0.standard_srv }
output "ip_access_list"    { value = mongodbatlas_project_ip_access_list.acl.ip_address }
output "project_name"      { value = mongodbatlas_project.demo.name }
output "username"          { value = mongodbatlas_database_user.user.username } 
output "user_password"     { 
  sensitive = true
  value = mongodbatlas_database_user.user.password 
  }
