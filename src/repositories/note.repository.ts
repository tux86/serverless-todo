import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput, UpdateItemCommand, UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import * as uuid from 'uuid';
import { config } from '../config';
import { AddNoteDto } from '../dtos/add-note.dto';
import { Note } from '../models/note.model';
import {UpdateNoteDto} from "../dtos/update-note.dto";

const { tableName } = config;

export class NoteRepository {
  constructor(private readonly ddbClient: DynamoDBClient) {}

  // create a note
  async addNote(addNoteDto: AddNoteDto): Promise<Note> {
    const note: Note = {
      noteId: uuid.v4(),
      ...addNoteDto,
      createdAt: new Date()
    };
    const input: PutItemCommandInput = {
      TableName: tableName,
      Item: marshall({
        ...note,
        createdAt: note.createdAt.toISOString()
      }),
    };
    await this.ddbClient.send(new PutItemCommand(input));
    return note;
  }

  // list all notes
  async listNotes(): Promise<Note[]> {
    const params: ScanCommandInput = {
      TableName: tableName,
    };
    // TODO: Query on attribute like "userId" should be used instead of a Scan.
    const result = await this.ddbClient.send(new ScanCommand(params));
    const items = result.Items || [];
    const notes: Note[] = [];
    for (const item of items) {
      notes.push(unmarshall(item) as Note);
    }
    return notes;
  }

  // get a note by hash key
  async getNote(noteId: string): Promise<Note | undefined> {
    const params: GetItemCommandInput = {
      TableName: tableName,
      Key: marshall({
        noteId,
      }),
    };
    const { Item } = await this.ddbClient.send(new GetItemCommand(params));
    return Item ? (unmarshall(Item) as Note) : undefined;
  }

  // update a note
  async updateNote(noteId: string, updateNoteDto: UpdateNoteDto): Promise<void> {
    const input: UpdateItemCommandInput = {
      TableName: tableName,
      Key: marshall({
        noteId,
      }),
      UpdateExpression: 'SET title = :title, content = :content, updatedAt = :updatedAt',
      ExpressionAttributeValues: marshall({
        ':noteId': noteId,
        ':title': updateNoteDto.title || null,
        ':content': updateNoteDto.content || null,
        ':updatedAt': (new Date()).toISOString()
      }),
      ConditionExpression: 'noteId = :noteId',
      ReturnValues: 'ALL_NEW',
    };
    await this.ddbClient.send(new UpdateItemCommand(input));
  }

  // delete a note
  async deleteNote(noteId: string): Promise<boolean> {
    const params: DeleteItemCommandInput = {
      TableName: tableName,
      Key: marshall({
        noteId,
      }),
    };
    await this.ddbClient.send(new DeleteItemCommand(params));
    return true;
  }

}
