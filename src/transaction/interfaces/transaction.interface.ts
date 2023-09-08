import { Document, Types } from 'mongoose';
import { Agent } from 'src/agent/interfaces/agent.interface';

export interface Transaction extends Document {
  amount: string;
  destinationWallet: string;
  status: 'approved' | 'pending';
  sender: string;
  recipient: string;
}
