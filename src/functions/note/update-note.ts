import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler} from 'aws-lambda';
import {noteRepository} from '../../repositories';
import {
  buildInternalServerErrorResponse,
  buildJSONResponse,
  buildNoContentResponse,
  buildNotFoundResponse
} from "../../utils/lambda.util";

const {parse} = JSON;

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const noteId = event.pathParameters?.noteId;
    if (!noteId) {
      return buildJSONResponse({message: 'required path parameter noteId'}, 400)
    }
    const body = event.body ? parse(event.body) : null;
    await noteRepository.updateNote(noteId, body);
    return buildNoContentResponse()
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return buildNotFoundResponse('Attempt to Update a non-existing object')
    } else {
      console.error('*** Error ***', error);
      return buildInternalServerErrorResponse()
    }
  }
};
