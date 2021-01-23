import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [
    User,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  exports: [UsersService, User],
  controllers: [UserController]
})

export class UsersModule {}