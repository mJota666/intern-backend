import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel }                   from '@nestjs/mongoose';
import { Model }                         from 'mongoose';
import * as bcrypt                       from 'bcryptjs';

import { User, UserDocument }           from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findAll() {
    return this.userModel.find().select('-passwordHash').exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).select('-passwordHash').exec();
  }

  async create(data: Partial<User>) {
    data.passwordHash = await bcrypt.hash(data.passwordHash!, 10);
    return this.userModel.create(data);
  }

  async update(id: string, data: Partial<User>) {
    if (data.passwordHash) {
      data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
    }
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async changeRole(id: string, role: User['role']) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    user.role = role;
    return user.save();
  }
}
