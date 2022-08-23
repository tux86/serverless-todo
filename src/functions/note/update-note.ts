import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler} from 'aws-lambda';
import {noteRepository} from '../../repositories';

const {stringify, parse} = JSON;

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const noteId = event.pathParameters?.noteId;
    if (!noteId) {
      return {
        body: stringify({message: 'required path parameter noteId'}),
        statusCode: 400,
      };
    }
    const body = event.body ? parse(event.body) : null;
    await noteRepository.updateNote(noteId, body);
    return {
      statusCode: 204,
    };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return {
        body: stringify({message:  'Attempt to Update a non-existing object'}),
        statusCode: 404,
      };
    } else {
      console.error('Error', error);
      return {
        body: stringify({message: 'Internal server error'}),
        statusCode: 500,
      };
    }
  }
};
