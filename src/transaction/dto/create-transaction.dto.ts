import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString({ message: 'Missing some fields' })
  @IsNotEmpty({ message: 'Please enter a valid agent id' })
  senderId: string;

  @IsNotEmpty({ message: 'Please enter a valid amount' })
  amount: number;

  @IsNotEmpty({ message: 'Please enter a valid destination wallet' })
  destinationWallet: string;

  @IsNotEmpty({ message: 'Please enter a valid pin' })
  pin: string;

  @IsNotEmpty({ message: 'Please enter a valid otp' })
  otp: string;
}
