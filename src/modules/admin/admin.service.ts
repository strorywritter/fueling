import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station, StationDocument } from './schema/station.schema';
import { RegisterService } from '../register/register.service';
import { createStationDto } from './dto/createStation.dto';
require('dotenv').config();

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('station')
    private readonly stationModel: Model<StationDocument>,
    readonly registerService: RegisterService
  ) {}

  async createStation(station: createStationDto): Promise<any> {
    
    const Manager = {
      name: station.manager,
      email: station.email,
      password: station.password,
      // station: "Not Created"
    };
    const createManager = await this.registerService.createManager(Manager)
    
    const Station = {
      name: station.name,
      district: station.district,
      stock: station.stock,
      manager: createManager._id
    };
    const newStation = await new this.stationModel(Station);

    await this.registerService.updateManager(createManager._id,newStation._id)

    return newStation.save();
  }

  async getAllStations(): Promise<any> {
    const Stations = await this.stationModel.find().lean();
    return Stations;
  }

  async getStationById(stationId: string): Promise<Station> {
    const Station = await this.stationModel.findById(stationId).lean();
    if (isEmpty(Station)) {
      throw new BadRequestException('Can not find a station for given Id');
    }
    return Station;
  }

  async getStationByName(stationName: string): Promise<Station> {
    const Station = await this.stationModel.findOne({name : stationName}).lean();
    if (isEmpty(Station)) {
      throw new BadRequestException('Can not find a station for given Name');
    }
    return Station;
  }

  async decreseStock(stationId: string, stock: number): Promise<Station> {
    const checkStation = await this.getStationById(stationId);
    if (isEmpty(checkStation)) {
      throw new BadRequestException('Can not find a station for given Id');
    }
    const oldStock = Number(checkStation.stock);
    const change = Number(stock);
    const newStock = oldStock - change;
    const Station = await this.stationModel.findByIdAndUpdate(
      checkStation['_id'],
      {
        stock: newStock,
      },
      { new: true },
    );
    return Station;
  }

  async increseStock(stationId: string, stock: number): Promise<Station> {
    const checkStation = await this.getStationById(stationId);
    if (isEmpty(checkStation)) {
      throw new BadRequestException('Can not find a station for given Id');
    }
    const oldStock = Number(checkStation.stock);
    const change = Number(stock);
    const newStock = oldStock + change;
    const Station = await this.stationModel.findByIdAndUpdate(
      checkStation['_id'],
      {
        stock: newStock,
      },
      { new: true },
    );
    return Station;
  }
}