import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule }  from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


