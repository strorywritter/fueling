require('dotenv').config();
import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { RegisterModule } from './modules/register/register.module';

@Module({
  imports: [
    AdminModule,
    RegisterModule,
    ConsumerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
