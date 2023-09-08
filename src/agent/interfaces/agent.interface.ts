import { Document, Types } from 'mongoose';
import { Wallet } from 'src/common/interfaces/wallet.interface';

export interface Agent extends Document {
  agentId: string;
  name: string;
  phone: string;
  pin: string;
  balance?: number;
}
