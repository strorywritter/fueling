require('dotenv').config();
import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
