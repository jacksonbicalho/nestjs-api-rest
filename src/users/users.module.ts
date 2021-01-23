import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { Cryptography } from 'src/libs/cryptography';

@Module({
  imports: [
    Cryptography,
    User,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService, Cryptography],
  exports: [UsersService, User],
  controllers: [UserController]
})

export class UsersModule {}