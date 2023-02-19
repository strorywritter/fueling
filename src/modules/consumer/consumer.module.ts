require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { RegisterModule } from '../register/register.module';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { RequestSchema } from './schema/requset.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{name:'consumer',schema:RequestSchema}]),
    RegisterModule,
    AdminModule
  ],
  providers: [ConsumerService],
  controllers: [ConsumerController],
  // exports: [AdminService],
})
export class ConsumerModule {}
