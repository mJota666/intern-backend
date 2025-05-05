import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ContentDocument = Content & Document;

export type Block =
  | { type: 'text';  data: { header: string; body: string } }
  | { type: 'image'; data: string }
  | { type: 'video'; data: string };

@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [
      {
        type: { type: String, enum: ['text','image','video'], required: true },
        data: { type: MongooseSchema.Types.Mixed, required: true },
      }
    ],
    default: [],
  })
  blocks: Block[];

  @Prop({ enum: ['draft','submitted','published'], default: 'draft' })
  status: 'draft'|'submitted'|'published';
}

export const ContentSchema = SchemaFactory.createForClass(Content);
