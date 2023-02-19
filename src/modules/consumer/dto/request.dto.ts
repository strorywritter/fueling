import { IsBoolean, isDate, IsDateString, isDateString, IsEnum, IsMongoId, isMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, max, Min } from 'class-validator';
import { timeStamp } from 'console';
import { createStationI } from '../consumer.types';

export class createRequestDto {
    
    @IsNotEmpty()
    @IsNumber()
    @Max(20)
    @Min(1)
    readonly amount: number;

    @IsNotEmpty()
    @IsString()
    readonly station: string
    
    @IsNotEmpty()
    @IsDateString()
    readonly date: Date

    // @IsNotEmpty()
    // @IsDateString()
    // readonly vehicleNumber: string

}

export class getUser {
    
  @IsNotEmpty()
  @IsMongoId()
  readonly userId: string;

}

export class getRequest {
    
  @IsNotEmpty()
  @IsMongoId()
  readonly requestId: string;

}

// export class updateStationDto {
    
//   @IsNotEmpty()
//   @IsMongoId()
//   readonly stationId: string;

//   @IsNotEmpty()
//   readonly stock: number

// }