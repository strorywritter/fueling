import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station, StationDocument } from './schema/station.schema';
require('dotenv').config();

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('station')
    private readonly stationModel: Model<StationDocument>,
  ) {}

  async createStation(station: Station): Promise<Station> {
    const newStation = new this.stationModel(station);
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