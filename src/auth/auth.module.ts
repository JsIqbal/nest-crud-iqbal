import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/user.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersRepo } from 'src/users/users.repo';
import { PasswordService } from 'src/users/password/password.service';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    UsersService,
    UsersRepo,
    PasswordService
  ],
  controllers: [AuthController],
  imports: [UsersModule,
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
