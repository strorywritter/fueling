import { IsDateString, IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class createRequestDto {
    
    @IsNotEmpty()
    @IsEmail()
    readonly userEmail: string;

    @IsNotEmpty()
    @IsString()
    readonly station: string
  
}