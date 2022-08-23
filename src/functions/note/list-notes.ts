import { APIGatewayEvent, Handler } from 'aws-lambda';
import { noteRepository } from '../../repositories';
const { stringify } = JSON;
export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const notes = await noteRepository.listNotes();
    return {
      body: stringify(notes),
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
