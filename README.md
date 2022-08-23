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


## Undeploy

```shell
$ yarn remove --stage dev --region us-east-1
```
