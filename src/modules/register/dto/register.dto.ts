import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class registerDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    // @Transform(({name}) => name.toUpperCase())
    readonly vehicleNumber: string;

}

export class managerDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsMongoId()
    // @Transform(({name}) => name.toUpperCase())
    readonly station?: string;

}