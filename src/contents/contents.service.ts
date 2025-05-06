import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel }           from '@nestjs/mongoose';
import { Model }                 from 'mongoose';
import { Content, ContentDocument } from './schema/content.schema';
import { CreateContentDto }      from './dto/create-content.dto';
import { UpdateContentDto }      from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content.name)
    private readonly contentModel: Model<ContentDocument>,
  ) {}

  async findAll(): Promise<ContentDocument[]> {
    return this.contentModel.find().exec();
  }

  async findOne(id: string): Promise<ContentDocument> {
    const doc = await this.contentModel.findById(id).exec();
    if (!doc) {
      throw new NotFoundException(`Content ${id} not found`);
    }
    return doc;
  }

  async create(dto: CreateContentDto): Promise<ContentDocument> {
    const created = new this.contentModel(dto);
    return created.save();
  }

  async update(
    id: string,
    dto: UpdateContentDto,
  ): Promise<ContentDocument> {
    const doc = await this.contentModel.findById(id).exec();
    if (!doc) {
      throw new NotFoundException(`Content ${id} not found`);
    }
    Object.assign(doc, dto);
    return doc.save();
  }

  async remove(id: string): Promise<void> {
    const res = await this.contentModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Content ${id} not found`);
    }
  }

  async submit(id: string): Promise<ContentDocument> {
    const doc = await this.findOne(id);
    // if (doc.status !== 'draft') {
    //   throw new ForbiddenException('Only drafts can be submitted');
    // }
    doc.status = 'published';
    return doc.save();
  }
}
