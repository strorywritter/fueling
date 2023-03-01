import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { loginDto } from './dto/login.dto';
import { managerDto, registerDto } from './dto/register.dto';
import { register, RegisterDocument } from './schema/register.schema';
require('dotenv').config();

const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretForPassword');


@Injectable()
export class RegisterService {
  constructor(
    @InjectModel('register')
    private readonly registerModel: Model<RegisterDocument>,
  ) { }
  // susanthika
  async register(user: registerDto): Promise<register> {

    const checkMail = await this.registerModel.findOne({ email: user.email }).lean()
    if (!isEmpty(checkMail)) {
      throw new BadRequestException('Email already used');
    }

    const checkVehicleNum = await this.registerModel.findOne({ vehicleNumber: user.vehicleNumber }).lean()
    if (!isEmpty(checkVehicleNum)) {
      throw new BadRequestException('Vehicle Number already used');
    }

    const encryptedPassword = cryptr.encrypt(user.password);
    // const decryptedString = cryptr.decrypt(encryptedString);
    const newUser = new this.registerModel({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
      vehicleNumber: user.vehicleNumber,
      role: 'USER'
    });
    return newUser.save();
  }
}