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
  ) {}

 
}