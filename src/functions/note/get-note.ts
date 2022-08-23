import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler} from 'aws-lambda';
import {noteRepository} from '../../repositories';


const {stringify} = JSON;
export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  try {
    const noteId = event.pathParameters?.noteId;
    if (!noteId) {
      return {
        body: stringify({message: 'required path parameter noteId'}),
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
      body: stringify({message: 'Internal server error'}),
      statusCode: 500,
    };
  }
};
