GET https://public-rest-api-demo.hsinih.workers.dev/api/images
[Query]
page: 1
HTTP 200
[Asserts]
jsonpath "$.success" == true
