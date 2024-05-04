import { IsNotEmpty } from 'class-validator';

export class LoginInputDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
