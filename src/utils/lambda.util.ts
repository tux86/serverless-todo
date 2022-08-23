import {APIGatewayProxyResultV2} from "aws-lambda";

const {stringify} = JSON;

// build a APIGateway JSON result
export const buildJSONResponse = (payload: unknown, statusCode = 200): APIGatewayProxyResultV2 => {
  return {
    statusCode,
    body: stringify(payload),
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
}

export const buildNoContentResponse = (): APIGatewayProxyResultV2 => {
  return buildJSONResponse('', 204)
}

export const buildNotFoundResponse = (message = 'not found'): APIGatewayProxyResultV2 => {
  return buildJSONResponse({message}, 404)
}

export const buildInternalServerErrorResponse = (message = 'Internal Server Error'): APIGatewayProxyResultV2 => {
  return buildJSONResponse({message}, 500)
}
