import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document }                   from 'mongoose';

export type ContentDocument = Content & Document;

export interface ContentBlock {
  type: 'text' | 'image' | 'video';
  data: string;
}

@Schema({ timestamps: true })
export class Content {
  @Prop()               title: string;
  @Prop([Object])       blocks: ContentBlock[];
  @Prop({ default: false }) published: boolean;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
