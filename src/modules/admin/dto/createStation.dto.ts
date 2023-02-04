import { IsBoolean, IsEnum, IsMongoId, isMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { createStationI } from '../admin.types';

export enum Districts {
    Ampara = 'Ampara',
    Anuradhapura = 'Anuradhapura',
    Badulla = 'Badulla',
    Batticaloa = 'Batticaloa',
    Colombo = 'Colombo',
    Gampaha = 'Gampaha',
    Galle = 'Galle',
    Hambantota = 'Hambantota',
    Jaffna = 'Jaffna',
    Kilinochchi = 'Kilinochchi',
    Kalutara = 'Kalutara',
    Kandy = 'Kandy',
    Kegalle = 'Kegalle',
    Kurunegala = 'Kurunegala',
    Mannar = 'Mannar',
    Matale = 'Mullaitivu',
    Matara = 'Mullaitivu',
    Monaragala = 'Monaragala',
    Mullaitivu = 'Mullaitivu',
    NuwaraEliya = 'Nuwara Eliya',
    Polonnaruwa = 'Polonnaruwa',
    Puttalam = 'Puttalam',
    Ratnapura = 'Ratnapura',
    Trincomalee = 'Trincomalee',
    Vavuniya = 'Vavuniya',
    
  }

  
export class createStationDto {
    
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEnum(Districts)
    readonly district: Districts
    
    @IsNotEmpty()
    @IsNumber()
    readonly stock: number

}

export class getStationDto {
    
  @IsNotEmpty()
  @IsMongoId()
  readonly stationId: string;

}

export class updateStationDto {
    
  @IsNotEmpty()
  @IsMongoId()
  readonly stationId: string;

  @IsNotEmpty()
  readonly stock: number

}