# Serverless Todo API

## Description

This is a TypeScript powered serverless REST API example for a simple todo application.

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

## Getting Started
- Clone the project repository by running the command below.
```shell
$ git clone git@github.com:tux86/serverless-todo.git
```
- install dependencies
```shell
$ cd serverless-todo && yarn install
```
- Start the offline mode and follow the instructions in the console.

```shell
$ yarn start  # start serverless offline mode
```

## Deploy

To deploy the stack on AWS, you need to execute the following command:

```shell
$ yarn deploy
```

## Testing the API

* POST /notes `create a note`
  * sample request body `application/json`:
    ```json
    {
        "title": "serverless todo api",
        "content": "serverless rocks !"
    }
    ```
  * successful response `http status 201`: 
    ```json
    {
        "noteId": "395a24db-f416-48f8-87ec-c76a87461c70",
        "title": "serverless todo api",
        "content": "serverless rocks!"
    }
    ```
  
* GET /notes `list all notes`
    * successful response `http status 200`:
    ```json
    [
      {
        "noteId": "395a24db-f416-48f8-87ec-c76a87461c70",
        "title": "serverless todo api",
        "content": "serverless rocks!"
      }
    ]
    ```

* GET /notes/{noteId}  `get a note`
    * successful response `http status 201`:
      ```json
      {
          "noteId": "395a24db-f416-48f8-87ec-c76a87461c70",
          "title": "serverless todo api",
          "content": "serverless rocks!"
      }
      ```
* PUT /notes/{noteId}  `update a note`
    * sample request body `application/json`:
      ```json
      {
          "title": "test update title",
          "content": "test update content"
      }
      ```
    * successful response `http status 200`:
      ```json
      {
          "noteId": "395a24db-f416-48f8-87ec-c76a87461c70",
          "title": "test update title",
          "content": "test update content"
      }
      ```
* DELETE /notes/{noteId} `delete a note`
    * successful response `http status 204` `empty response body`

    
## Remove the stack from AWS

```shell
$ yarn remove --stage dev --region us-east-1
```
