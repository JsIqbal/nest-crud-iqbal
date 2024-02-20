import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from './password/password.service';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class UsersRepo {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
        private passwordService: PasswordService,
    ) {}

    async create(req: CreateUserDto) {
        const { username } = req;

        const user = await this.usersRepository.findOne({ where: { username } });
        if (user) {
            Logger.log(`User ${username} already exists`);
            return null;
        }

        const id = uuidv4();

        const hashedPassword = await this.passwordService.hashPassword(req.password);

        const newUser = await this.usersRepository.save({...req,password: hashedPassword, id});
        delete newUser['password'];

        // const { password, ...userWithoutPassword } = newUser;
        Logger.log(`User created: ${JSON.stringify(newUser)}`);

        return newUser;
    }

    async delete(id: string) {
        const user = await this.usersRepository.findOne({ where: { id } });

        if(!user) {
            return null;
        }
        this.usersRepository.delete({ id})
        delete user['password'];

        Logger.log(`User deleted: ${JSON.stringify(user)}`);
        return user;
    }
}
