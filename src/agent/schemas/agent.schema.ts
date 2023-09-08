import mongoose, { Types } from 'mongoose';
import { WalletSchema } from 'src/common/schemas/wallet.schema';
import { Agent } from '../interfaces/agent.interface';

export const AgentSchema = new mongoose.Schema<Agent>(
  {
    agentId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 12,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    pin: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4,
    },
    balance: { type: Number },
  },
  { timestamps: true },
);
