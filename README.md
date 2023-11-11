# public-rest-api-demo
attempt deploy to render (or heroku free tier) and also proof terraform aws too



## dev notes

- started from the GCP cloudrun meanstack terraform files: https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform/
and adjusted according to the MongoDB blog (by Zuhair Ahmed): https://www.mongodb.com/developer/products/atlas/deploy-mongodb-atlas-terraform-aws/

- the hashicorp learn tutorial states that Heroku formation requires a billing account: https://developer.hashicorp.com/terraform/tutorials/applications/heroku-provider

- with Leka-Workshop/Bun-CRUD-App attempt to push to gh registry for use as the app_image in cloud run

- terraform google cloud provider expects app_image to have the registry in the form of [region.]gcr.io, [region-]docker.pkg.dev or docker.io BUT we wanted to use ghcr.io

- the connection string for the original GCP tutorial didn't need the db_name because the nodejs logic has it in the connect call. We had to append it the the ATLAS_URI since the bun/elysia example is db_name agnostic.

- when calling `terraform apply` from the Google Cloud shell, it may be necessary to do `gcloud config unset project` first to remove assocation to existing projects (which may be defaults). Otherwise, you may encounter the error about Cloud Billing API being disabled.

- to use postman to obtain a new access token, you can switch the `Authorization callback URL` in GitHub OAuth apps from "https://project-name.firebaseapp.com/__/auth/handler" to "https://oauth.pstmn.io/v1/browser-callback"

- postman fields for endpoints would be "https://github.com/login/oauth/authorize" and "https://github.com/login/oauth/access_token"; also client secret was a newly gen key from github OAuth apps since we can't remember the old key.

- with the temp callback switched postman was able to fetch the access token after login credentials passed. Then we copy the access token as "accesstoken" into a separate POST request JSON. Also "authprovider" field value of "github". Postman sends this POST to our cloudrun API at `/api/auth/signin` and the result should be `201`. Confirm it by opening "console.firebase.google.com" and checking the authentication|users list.

- using base64 as a placeholder for the access token encoding; docs advise not to transmit the tokens in plain text, so in addition to TLS we want to be safe.

