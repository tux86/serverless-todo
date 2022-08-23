import {APIGatewayProxyResultV2, Handler} from 'aws-lambda';
import {noteRepository} from '../../repositories';
import {buildInternalServerErrorResponse, buildJSONResponse} from "../../utils/lambda.util";

export const handler: Handler = async (): Promise<APIGatewayProxyResultV2> => {
  try {
    const notes = await noteRepository.listNotes();
    return buildJSONResponse(notes)
  } catch (error) {
    console.error('*** Error ***', error);
    return buildInternalServerErrorResponse()
  }
};
