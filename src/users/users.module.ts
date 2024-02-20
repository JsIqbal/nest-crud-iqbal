import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './user.entity';
import { PasswordService } from './password/password.service';
import { UsersRepo } from './users.repo';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, UsersRepo],
  exports: [UsersService],
})
export class UsersModule {}
