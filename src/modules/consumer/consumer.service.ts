import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterService } from '../register/register.service';
import { createRequestDto } from './dto/request.dto';
import { ConsumerDocument } from './schema/requset.schema';
import { isEmpty } from 'lodash';
import { AdminService } from '../admin/admin.service';
require('dotenv').config();
const nodemailer = require('nodemailer');
// const client = require('twilio')('AC18e3a6c63ba3d1685e2179ea9f959077', '94383d5e79a0154dc56371d33fd08985');

@Injectable()
export class ConsumerService {
  constructor(
    @InjectModel('consumer')
    private readonly consumerModel: Model<ConsumerDocument>,
    readonly registerService: RegisterService,
    readonly stationrService: AdminService,
  ) {}

  async createRequest(request: createRequestDto, user: string): Promise<any> {
    const checkUser = await this.registerService.getUser(user);

    const checkFuelAvailability = await this.stationrService.getStationById(
      request.station,
    );
    if (checkFuelAvailability.stock < request.amount) {
      throw new BadRequestException(
        `There is no fuel available on ${request.station}`,
      );
    }

    const checkTimeAvailability = await this.consumerModel.find({
      date: request.date,
    });
    if (!isEmpty(checkTimeAvailability)) {
      throw new BadRequestException('Time slot is not available');
    }
    if (isEmpty(checkTimeAvailability)) {
      const newRequsest = await this.consumerModel.create({
        ...request,
        stationName: checkFuelAvailability.name,
        user: user,
        vehicleNumber: checkUser.vehicleNumber,
        status: 'REQUESTED',
      });

      const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fuelingsmart@gmail.com',
          pass: process.env.EMAIL_PASS,
        },
      });

      var mailOptions = {
        from: 'fuelingsmart@gmail.com',
        to: checkUser.email,
        subject: `Request Confirmed on ${request.date}`,
        text: `Your Vehicle ${checkUser.vehicleNumber} can get the requested fuel quota on ${request.date} at ${request.station}. Thank you`,
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      // async function sendSMS() {

      //   client.messages.create({
      //     body: 'hello',
      //     to: '+94772101308',
      //     from: '+945178815'
      //   }).then(message => console.log(message)).catch(err => console.log(err))

      // }

      return newRequsest;
    }
  }

  async getAllRequests(): Promise<any> {
    const reuests = await this.consumerModel.find().lean();
    return reuests;
  }

  async getActiveRequests(): Promise<any> {
    const requests = await this.consumerModel
      .find({ status: 'REQUESTED' })
      .lean();
    if (isEmpty(requests)) {
      throw new BadRequestException('No Active requests');
    }
    return requests;
  }

  async getRequestsByUser(user: string): Promise<any> {
    const requests = await this.consumerModel.find({ user: user }).lean();
    if (isEmpty(requests)) {
      throw new BadRequestException('No requests for user');
    }
    return requests;
  }

  async completeRequest(requestId: string): Promise<any> {
    const request = await this.consumerModel.findById(requestId).lean();
    if (isEmpty(request)) {
      throw new BadRequestException('Can not find a Request for given Id');
    }

    // reduce user quota
    const user = await this.registerService.getUser(request['user']);
    await this.registerService.reduceWeeklyQuota(
      request['user'],
      user['weeklyQuato'] - request['amount'],
    );

    // reduce station quota
    await this.stationrService.decreseStock(
      request['station'],
      request['amount'],
    );

    // update request
    return await this.consumerModel.findByIdAndUpdate(
      requestId,
      { status: 'completed' },
      { new: true },
    );
  }
}
