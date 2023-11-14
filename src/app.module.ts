import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ModuleController } from './service/module/module.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, ModuleController],
  providers: [AppService],
})
export class AppModule {}
