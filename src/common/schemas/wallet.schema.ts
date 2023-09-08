import mongoose from 'mongoose';
import { AgentSchema } from 'src/agent/schemas/agent.schema';
import { Wallet } from '../interfaces/wallet.interface';

export const WalletSchema = new mongoose.Schema<Wallet>(
  {
    balance: {
      type: Number,
      default: 0,
    },
    walletId: String,
    owner: String,
  },
  { timestamps: true },
);
