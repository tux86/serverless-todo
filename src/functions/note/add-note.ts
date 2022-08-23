import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler} from 'aws-lambda';
import {noteRepository} from '../../repositories';
import {buildInternalServerErrorResponse, buildJSONResponse} from "../../utils/lambda.util";

const {parse} = JSON;

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const body = event.body ? parse(event.body) : null;
    const note = await noteRepository.addNote(body);
    return buildJSONResponse(note)
  } catch (error) {
    console.error('*** Error ***', error);
    return buildInternalServerErrorResponse()
  }
};
