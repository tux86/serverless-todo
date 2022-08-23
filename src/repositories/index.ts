import {NoteRepository} from './note.repository';
import {dynamodbClient} from '../clients/dynamodb.client';

// export repositories
export const noteRepository = new NoteRepository(dynamodbClient);
