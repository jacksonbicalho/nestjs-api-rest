import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User }  from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    User,
    // forwardRef(() => UserModule),
    TypeOrmModule.forFeature([User])
  ],
  // imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService, User],
  controllers: [UserController]
})
export class UserModule {}