require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { registerSchema } from './schema/register.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{name:'register',schema:registerSchema}]),
  ],
  providers: [RegisterService],
  controllers: [RegisterController],
  exports: [RegisterService],
})
export class RegisterModule {}
