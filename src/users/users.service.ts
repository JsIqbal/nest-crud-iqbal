import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepo } from './users.repo';

@Injectable()
export class UsersService {
  constructor(private userRepo: UsersRepo) {}

  async createUser(req: CreateUserDto) {
    return this.userRepo.create(req);
  }

  async deleteUser(id: string) {
    return this.userRepo.delete(id);
  }
}
