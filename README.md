# public-rest-api-demo
public repo to attempt deploy to render (or heroku free tier) and also proof terraform aws too


## dev notes

- started from the GCP cloudrun meanstack terraform files: https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform/
and adjusted according to the MongoDB blog (by Zuhair Ahmed): https://www.mongodb.com/developer/products/atlas/deploy-mongodb-atlas-terraform-aws/

- the hashicorp learn tutorial states that Heroku formation requires a billing account: https://developer.hashicorp.com/terraform/tutorials/applications/heroku-provider

- with Leka-Workshop/Bun-CRUD-App attempt to push to gh registry for use as the app_image in cloud run

- terraform google cloud provider expects app_image to have the registry in the form of [region.]gcr.io, [region-]docker.pkg.dev or docker.io BUT we wanted to use ghcr.io

- the connection string for the original GCP tutorial didn't need the db_name because the nodejs logic has it in the connect call. We had to append it the the ATLAS_URI since the bun/elysia example is db_name agnostic.

