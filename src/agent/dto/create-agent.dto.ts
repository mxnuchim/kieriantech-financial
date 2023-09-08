import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty({
    type: String,
    example: 'Test Agent',
    description: 'Name of agent to create',
  })
  @IsString({ message: 'Missing some fields' })
  @IsNotEmpty({ message: 'Please enter a valid name' })
  name: string;

  @ApiProperty({
    type: String,
    example: '+2349081601551',
    description: 'Phone number of agent to create',
  })
  @IsString({ message: 'Missing some fields' })
  @IsNotEmpty({ message: 'Please enter a valid phone number' })
  phone: string;

  @ApiProperty({
    type: String,
    example: '1234',
    description: 'PIN number of agent for authorizing transactions',
  })
  @IsString({ message: 'Missing some fields' })
  @IsNotEmpty({ message: 'Please enter a valid pin' })
  pin: string;
}
