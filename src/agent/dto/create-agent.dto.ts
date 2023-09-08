import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgentDto {
  @IsString({ message: 'Missing some fields' })
  @IsNotEmpty({ message: 'Please enter a valid name' })
  name: string;

  @IsString({ message: 'Missing some fields' })
  @IsNotEmpty({ message: 'Please enter a valid phone number' })
  phone: string;

  @IsString({ message: 'Missing some fields' })
  @IsNotEmpty({ message: 'Please enter a valid pin' })
  pin: string;
}
