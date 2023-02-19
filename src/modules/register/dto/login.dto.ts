import { IsNotEmpty, IsString } from 'class-validator';

export class loginDto {

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

}