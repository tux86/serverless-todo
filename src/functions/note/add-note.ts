import { APIGatewayEvent, Handler } from 'aws-lambda';
const { stringify, parse } = JSON;
import { noteRepository } from '../../repositories';

export const handler: Handler = async (
    event: APIGatewayEvent,
): Promise<any> => {
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
