import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { register, RegisterDocument } from './schema/register.schema';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
require('dotenv').config();

const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretForPassword');


@Injectable()
export class RegisterService {
  constructor(
    @InjectModel('register')
    private readonly registerModel: Model<RegisterDocument>,
  ) {}

  async register(user: registerDto): Promise<register> {

    const checkMail = await this.registerModel.findOne( { email: user.email } ).lean()
    if (!isEmpty(checkMail)) {
      throw new BadRequestException('Email already used');
    }

    const checkVehicleNum = await this.registerModel.findOne( { vehicleNumber: user.vehicleNumber } ).lean()
    if (!isEmpty(checkVehicleNum)) {
      throw new BadRequestException('Vehicle Number already used');
    }
   
    const encryptedPassword = cryptr.encrypt(user.password);
    // const decryptedString = cryptr.decrypt(encryptedString);
    const newUser = new this.registerModel({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
      vehicleNumber: user.vehicleNumber
    });
    return newUser.save();
  }

  async login (user: loginDto): Promise<any> {
    const userDtails = await this.registerModel.findOne( { email: user.email } ).lean()
    if (isEmpty(userDtails)) {
      throw new BadRequestException('User not found');
    }
    const decryptedPassword = cryptr.decrypt(userDtails.password);

    if(decryptedPassword != user.password){
      throw new BadRequestException('password not match');
    }
    return true;
  }

  async getUser(userId: string): Promise<any> {
    const user = await this.registerModel.findById(userId).lean();
    if (isEmpty(user)) {
      throw new BadRequestException('Invalid User');
    }
    return user;
  }

  async reduceWeeklyQuota(userId: string, quota: number): Promise<any> {
    return await this.registerModel.findByIdAndUpdate(userId, {weeklyQuato: quota});
    
  }

 
}