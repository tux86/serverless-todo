import { APIGatewayEvent, Handler } from 'aws-lambda';
import { noteRepository } from '../../repositories';
const { stringify } = JSON;
export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const noteId = event.pathParameters?.noteId;
    if (!noteId) {
      return {
        body: 'required path parameter noteId',
        statusCode: 400,
      };
    }
    const note = await noteRepository.getNote(noteId);

    if (!note) {
      return {
        body: stringify({
          message: 'not found',
        }),
        statusCode: 404,
      };
    }
    return {
      body: stringify(note),
      statusCode: 200,
    };
  } catch (error) {
    console.error('Error', error);
    return {
      body: 'Internal server error',
      statusCode: 500,
    };
  }
};
