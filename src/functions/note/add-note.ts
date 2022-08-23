import {APIGatewayProxyResultV2,APIGatewayProxyEventV2, Handler} from 'aws-lambda';
import {noteRepository} from '../../repositories';

const {stringify, parse} = JSON;

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const body = event.body ? parse(event.body) : null;
    const note = await noteRepository.addNote(body);
    return {
      body: stringify(note),
      statusCode: 201,
    };
  } catch (error) {
    console.error('Error', error);
    return {
      body: 'Internal server error',
      statusCode: 500,
    };
  }
};
