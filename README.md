# Serverless Todo API

## Description

This is a TypeScript powered serverless REST API example for a simple TODO application.

- **Platform:** AWS
- **Language:** TypeScript 4
- **Runtime/environment:** NodeJS (16.x)
- **Database:** dynamoDB
- **Framework:** serverless (v3)

## Architecture

<p align="center">
  <img src="https://user-images.githubusercontent.com/9397970/185930093-d2e83185-e742-4df3-a539-370b4ee6be10.png" alt="Architecture"/>
</p>

## Pre-requisites

-  [node 16.x](https://nodejs.org/fr/download/)
-   [yarn](https://yarnpkg.com/)

## ⛏️ Getting Started 
- clone the project repository by running the command below.
```shell
$ git clone git@github.com:tux86/serverless-todo.git
```
- install dependencies
```shell
$ cd serverless-todo && yarn install
```
- install dynamodb for local development
```shell
$ yarn dynamodb:install
```
- start the offline mode and follow the instructions in the console.
```shell
$ yarn start  # start serverless offline mode
```

## 🚀 Deploy

To deploy the stack on AWS, you need to execute the following command:

```shell
$ yarn deploy
```
💡
_use option  **---region <aws-region>** to change region (default: **us-east-1**)_

💡
_set option **---stage <dev|prod|...>** to deploy to a different environment (default: **dev**)_

## Testing the API

* POST /notes `create a note`
* GET /notes `list all notes`
* GET /notes/{noteId}  `get a note`
* PUT /notes/{noteId}  `update a note`
* DELETE /notes/{noteId} `delete a note`

#### Example : JSON object for a note
```json
{
    "noteId": "395a24db-f416-48f8-87ec-c76a87461c70",
    "title": "serverless todo api",
    "content": "serverless rocks!"
}
```

#### Postman collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ff906ff9c7730628a6ab?action=collection%2Fimport#?env%5BServerless%20Node.js%20TODO%20API%20Env%5D=W3sia2V5IjoiYXBpX2Jhc2VfdXJsIiwidmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsInNlc3Npb25JbmRleCI6MH1d)
    
## Remove the stack from AWS

```shell
$ yarn remove
```
