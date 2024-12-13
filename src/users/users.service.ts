import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users = [];

  constructor() {
    this.initializeUsers();
  }

  async initializeUsers() {
    const hashedPassword = await bcrypt.hash('password', 10);
    this.users.push({ id: 1, username: 'test', password: hashedPassword });
  }

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }

  async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
