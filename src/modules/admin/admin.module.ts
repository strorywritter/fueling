require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from '../register/register.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { StationSchema } from './schema/station.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{name:'station',schema:StationSchema}]),
    RegisterModule
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
