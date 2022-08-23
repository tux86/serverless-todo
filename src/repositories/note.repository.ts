import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import * as uuid from 'uuid';
import { config } from '../config';
import { AddNoteDto } from '../dtos/add-note.dto';
import { Note } from '../models/note.model';

const { tableName } = config;

export class NoteRepository {
  constructor(private readonly ddbClient: DynamoDBClient) {}

  // create a note
  async addNote(addNoteDto: AddNoteDto): Promise<Note> {
    const note: Note = {
      noteId: uuid.v4(),
      ...addNoteDto,
    };
    const input: PutItemCommandInput = {
      TableName: tableName,
      Item: marshall(note),
    };
    await this.ddbClient.send(new PutItemCommand(input));
    return note;
  }

  // list all notes
  async listNotes(): Promise<Note[]> {
    const params: ScanCommandInput = {
      TableName: tableName,
    };
    const result = await this.ddbClient.send(new ScanCommand(params));
    const items = result.Items || [];
    const notes: Note[] = [];
    for (const item of items) {
      notes.push(unmarshall(item) as Note);
    }
    return notes;
  }
}
