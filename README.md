# public-rest-api-demo
public repo to attempt deploy to render (or heroku free tier) and also proof terraform aws too


## dev notes

- started from the GCP cloudrun meanstack terraform files: https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform/
and adjusted according to the MongoDB blog (by Zuhair Ahmed): https://www.mongodb.com/developer/products/atlas/deploy-mongodb-atlas-terraform-aws/

- the hashicorp learn tutorial states that Heroku formation requires a billing account: https://developer.hashicorp.com/terraform/tutorials/applications/heroku-provider

- after terraform deploys mongo atlas, call `terraform output -json user_password`
  and `terraform output -json atlas_cluster_connection_string` to construct the
  environment variable "MONGODB_URI" 

- for hosting at render provider, settings are build: "npm install && npm run build" and start: "npm run start" (we adjusted the start script in package.json to be "node .dist/index.js"


