import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { config } from '../config';
const { region, isOffline } = config;

export let dynamodbClient: DynamoDBClient;

if (isOffline) {
  dynamodbClient = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
} else {
  dynamodbClient = new DynamoDBClient({ region });
}
