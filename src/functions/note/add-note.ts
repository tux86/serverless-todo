import {APIGatewayEvent, Handler} from 'aws-lambda';
export const handler: Handler = async (
    event: APIGatewayEvent,
): Promise<any> => {

    return {
        body: 'hello world !',
        statusCode: 200,
    };

};
