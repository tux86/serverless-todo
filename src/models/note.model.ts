export interface Note {
  noteId: string; // uuid
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
