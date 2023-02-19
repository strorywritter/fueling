const nodemailer = require('nodemailer');
require('dotenv').config();
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterService } from '../register/register.service';
import { createRequestDto } from './dto/request.dto';
import { ConsumerDocument } from './schema/requset.schema';
import { isEmpty } from 'lodash';

@Injectable()
export class EmailService {
  constructor(
    // @InjectModel('email')
    // private readonly emailModel: Model<ConsumerDocument>,
  ) {}

  async createRequest(): Promise<any> {

    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fuelingsmart@gmail.com',
          pass: process.env.EMAIL_PASS
        }
      });
      
      var mailOptions = {
        from: 'fuelingsmart@gmail.com',
        to: 'nramyashan@gmail.com',
        subject: 'your request',
        text: `request confirmed`
      };
      
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
}