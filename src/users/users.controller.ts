import {
  Controller,
  Post,
  Body,
  UsePipes,
  Res,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterPropertiesPipe } from 'src/common/pipes/filter-properties.pipe';
import { LoginDto } from './dto/login.dto';

@Controller('/api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @UsePipes(new FilterPropertiesPipe(['username', 'email', 'password']))
    async createUser(@Body() req: CreateUserDto, @Res() res: Response) {
        try {
            const newUser = await this.usersService.createUser(req);

            if (newUser) { res.status(HttpStatus.CREATED).send(newUser) } 
            else { res.status(HttpStatus.CONFLICT).send({ message: 'User already exists' }) }
        } catch (error) { res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: `Internal server error: \n THE ERROR: ${error}` }) }
    }

    @Post('/api/users/login')
    @UsePipes(new FilterPropertiesPipe(['username', 'password']))
    async login(@Body() req: LoginDto, @Res() res: Response) {

    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string , @Res() res: Response) {
        try {
            const user = await this.usersService.deleteUser(id);
            if(user) res.status(HttpStatus.OK).send({ message: `Deleted user: ${user}` }) 
           
            res.status(HttpStatus.NOT_FOUND).send({ message: `user with ${id} not found` }) 
        } catch (error) { res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: `Internal server error` }) }
    }
}
