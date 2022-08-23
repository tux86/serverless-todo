import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler} from 'aws-lambda';
import {noteRepository} from '../../repositories';
import {buildInternalServerErrorResponse, buildJSONResponse} from "../../utils/lambda.util";

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  try {
    const noteId = event.pathParameters?.noteId;
    if (!noteId) {
      return buildJSONResponse({message: 'required path parameter noteId'}, 400)
    }
    const note = await noteRepository.getNote(noteId);

    if (!note) {
      return buildJSONResponse({message: 'not found'}, 404)
    }
    return buildJSONResponse(note)
  } catch (error) {
    console.error('*** Error ***', error);
    return buildInternalServerErrorResponse()
  }
};
