# Api tests suite
You can create `config.yml` file that will be used by
test suite on run. The following is example config file:

```yml
setup: |
  python setup.py
teardown: |
  python teardown.py
vars:
  test_token: sd2j(Jd0sd)ih0dshsfs0ih0h2ih02110fhsanHHD)H0hfe
  api: http://localhost:8080
```

## Test header
Test description
> POST {{ api }}/sessions
> Content-Type: application/json
> X-Test-Mode: {{ test_token }}

```json
{
  "email": "test@email.com",
  "password": "secret"
}
```

Once http call is made the response object can be accessed

Assert that response has what we need
> assert @response.body contains tokenId
> assert @response.headers contains Authorization

Assert status code is ok
> assert @response.status > 200
> assert @response.status < 300

Assert content type is correct
> assert @response.contentType is application/json

Set variable that can be reused for the rest of test suite
> set token_id @response.body.token_id

You can also use json schema to validate response body against schema in file
> validate @response.body openapi.yml#/components/schemas/ExampleSchema

Or you can use json schema directly here to validate response payload
> validate @response.body.user
```yml
type: object
properties:
  email:
    type: string
    format: email
  name:
    type: string
    minLength: 2
    maxLength: 30
```

You can also output things to cli:
> print @response.body.tokenId

## Another test

Some description

> GET {{ api }}/sessions/1
> Authorization: Bearer {{ token_id }}

> assert @response.body is empty
> assert @response.status is 201

# User registers within an applicatoin

## Create an user

> GET {{ api }}/sessions/1
> Authorization: Bearer {{ token_id }}

> assert @response.body is empty
> assert @response.status is 201

## Authenticate

> GET {{ api }}/sessions/1
> Authorization: Bearer {{ token_id }}

> assert @response.body is empty
> assert @response.status is 201

## Set user details

> GET {{ api }}/sessions/1
> Authorization: Bearer {{ token_id }}

> assert @response.body is empty
> assert @response.status is 201


## Example output in CLI for the test
```
Test header
  POST http://localhost:8080/sessions
  ------------------>
  <-- 200 (358 ms)
  
    ✓ Assert that response has what we need
    ✓ Assert status code is ok
    ✓ Assert content type is correct
    ⚡ Set variable that can be reused for the rest of test suite
    ✘ You can also use json schema to validate response body against schema in file
        (failed to load the file openapi.yml)
    ✘ Or you can use json schema directly here to validate response payload
        (name property is required but missing)
    ⚡ You can also output things to cli:
      sd2j(Jd0sd)ih0dshsfs0ih0h2ih02110fhsanHHD)H0hfe
```

## Output can be also in json file, for later processing
TBC

