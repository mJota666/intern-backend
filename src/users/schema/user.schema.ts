import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document }                   from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })      email: string;
  @Prop()                      name: string;
  @Prop()                      passwordHash: string;
  @Prop({ default: 'client' }) role: 'admin' | 'editor' | 'client';
}

export const UserSchema = SchemaFactory.createForClass(User);
