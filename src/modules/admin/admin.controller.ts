import { Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Station } from './schema/station.schema';
import { createStationDto, getStationDto, updateStationDto } from './dto/createStation.dto';


@Controller('station')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('createStation')
  async createStations(@Body() createStation: createStationDto){
    return this.adminService.createStation(createStation)
  }

  @Get('getStation')
  async getAllStations(){
    return this.adminService.getAllStations()
  }

  @Get('getStation/:stationId')
  async getStation(@Param() param: getStationDto){
    return this.adminService.getStationById(param.stationId)
  }

  @Patch('decreaseStock/:stationId/:stock')
  async decreseStock(@Param() param: updateStationDto){
    return this.adminService.decreseStock(param.stationId,param.stock)
  } 

  @Patch('increaseStock/:stationId/:stock')
  async increaseStock(@Param() param: updateStationDto){
    return this.adminService.increseStock(param.stationId,param.stock)
  } 

  
}
