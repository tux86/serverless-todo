import {APIGatewayEvent, Handler} from 'aws-lambda';
import {noteRepository} from '../../repositories';
import {
  buildInternalServerErrorResponse,
  buildJSONResponse,
  buildNoContentResponse,
  buildNotFoundResponse,
} from "../../utils/lambda.util";

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const noteId = event.pathParameters?.noteId;

    if (!noteId) {
      return buildJSONResponse({message: 'required path parameter noteId'}, 400)
    }
    const note = await noteRepository.deleteNote(noteId);
    if (!note) {
      return buildNotFoundResponse()
    }
    return buildNoContentResponse()
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return buildNotFoundResponse('Attempt to delete a non-existing object')
    } else {
      console.error('*** Error ***', error);
      return buildInternalServerErrorResponse()
    }
  }
};
