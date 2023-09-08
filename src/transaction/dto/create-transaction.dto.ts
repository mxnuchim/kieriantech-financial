import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    type: String,
    example: '475805115043',
    description: 'ID of sender agent',
  })
  @IsString({ message: 'Missing some fields' })
  @IsNotEmpty({ message: 'Please enter a valid agent id' })
  senderId: string;

  @ApiProperty({
    type: String || Number,
    example: '1000',
    description: 'AMount to transfer between wallets',
  })
  @IsNotEmpty({ message: 'Please enter a valid amount' })
  amount: number;

  @ApiProperty({
    type: String,
    example: '692565182071',
    description: 'ID of destination wallet',
  })
  @IsNotEmpty({ message: 'Please enter a valid destination wallet' })
  destinationWallet: string;

  @ApiProperty({
    type: String,
    example: '1234',
    description: 'Agents unique PIN',
  })
  @IsNotEmpty({ message: 'Please enter a valid pin' })
  pin: string;

  @ApiProperty({
    type: String,
    example: '0000',
    description:
      'OTP received by agent on their registered phone line. The default is currently 0000',
  })
  @IsNotEmpty({ message: 'Please enter a valid otp' })
  otp: string;
}
