import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { createRequestDto, getRequest, getUser } from './dto/request.dto';
import { ConsumerService } from './consumer.service';


@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Post('createRequest/:userId')
  async createRequset(@Body() request: createRequestDto, @Param() user: getUser){
    return this.consumerService.createRequest(request, user.userId)
  }

  @Get('getAllRequests')
  async getAllRequests(){
    return this.consumerService.getAllRequests()
  }

  @Get('getActiveRequests')
  async getActiveRequests(){
    return this.consumerService.getActiveRequests()
  }

  @Get('getRequestsByUser/:userId')
  async getRequestsByUser(@Param() user: getUser){
    return this.consumerService.getRequestsByUser(user.userId)
  }

  @Patch('completeRequest/:requestId')
  async completeRequest(@Param() request: getRequest,@Body() body: any){
    return this.consumerService.completeRequest(request.requestId, body.reqStatus)
  }


}
