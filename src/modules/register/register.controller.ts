import { Body, Controller, Get, Post } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { RegisterService } from './register.service';


@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() register: registerDto){
    return this.registerService.register(register)
  }

  @Get('login')
  async login(@Body() register: loginDto){
    return this.registerService.login(register)
  }

  // @Get('getStation/:stationId')
  // async getStation(@Param() param: getStationDto){
  //   return this.appService.getStationById(param.stationId)
  // }

  // @Patch('decreaseStock/:stationId/:stock')
  // async decreseStock(@Param() param: updateStationDto){
  //   return this.appService.decreseStock(param.stationId,param.stock)
  // } 

  // @Patch('increaseStock/:stationId/:stock')
  // async increaseStock(@Param() param: updateStationDto){
  //   return this.appService.increseStock(param.stationId,param.stock)
  // } 

  
}
