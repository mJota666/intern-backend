import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel }                   from '@nestjs/mongoose';
import { Model }                         from 'mongoose';

import { Content, ContentDocument } from './schema/content.schema';

@Injectable()
export class ContentsService {
  constructor(@InjectModel(Content.name) private contentModel: Model<ContentDocument>) {}

  findAll() {
    return this.contentModel.find().exec();
  }

  findOne(id: string) {
    return this.contentModel.findById(id).exec();
  }

  create(data: Partial<Content>) {
    return this.contentModel.create(data);
  }

  update(id: string, data: Partial<Content>) {
    return this.contentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string) {
    return this.contentModel.findByIdAndDelete(id).exec();
  }

  async submit(id: string) {
    const content = await this.contentModel.findById(id);
    if (!content) throw new NotFoundException();
    content.published = true;
    return content.save();
  }
}
