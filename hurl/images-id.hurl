GET https://public-rest-api-demo.hsinih.workers.dev/api/images/3
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.image.author" == "Lara Lobster"
