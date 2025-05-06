import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { Content } from 'src/contents/schema/content.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Content.name) private contentModel: Model<Content>,
  ) {}

  async seed() {
    try {
      console.log('Seeding Users...');
      const users = await this.seedUsers();
      console.log('Users seeded:', users);

      console.log('Seeding Contents...');
      const contents = await this.seedContents();
      console.log('Contents seeded:', contents);
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }

  async seedUsers() {
    const users = [
      {
        email: 'admin@example.com',
        name: 'Admin User',
        passwordHash: await bcrypt.hash('admin', 10),
        role: 'admin',
      },
      {
        email: 'editor@example.com',
        name: 'Editor User',
        passwordHash: await bcrypt.hash('editor', 10),
        role: 'editor',
      },
      {
        email: 'client@example.com',
        name: 'Client User',
        passwordHash: await bcrypt.hash('client', 10),
        role: 'client',
      },
    ];

    return await this.userModel.insertMany(users);
  }

  async seedContents() {
    const contents = [
      {
        title: 'Welcome to the Intern App',
        blocks: [
          { type: 'text', data: { header: 'Introduction', body: 'This is the first article in your new CMS.' } },
          { type: 'image', data: 'https://placekitten.com/600/300' },
        ],
        status: 'published',
      },
      {
        title: 'Draft: How to Use Our Platform',
        blocks: [
          { type: 'text', data: { header: 'Step 1', body: 'Register an account.' } },
          { type: 'text', data: { header: 'Step 2', body: 'Log in as admin or editor.' } },
        ],
        status: 'draft',
      },
    ];

    return await this.contentModel.insertMany(contents);
  }
}
