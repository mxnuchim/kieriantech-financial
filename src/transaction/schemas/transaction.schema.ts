import mongoose from 'mongoose';
import { AgentSchema } from 'src/agent/schemas/agent.schema';
import { Transaction } from '../interfaces/transaction.interface';

export enum transactionStatusEnum {
  PENDING = 'pending',
  APROVED = 'approved',
}

export const TransactionSchema = new mongoose.Schema<Transaction>(
  {
    amount: {
      type: String,
    },
    destinationWallet: {
      type: String,
    },
    status: {
      type: String,
      enum: transactionStatusEnum,
      default: 'pending',
    },
    sender: { type: String },
    recipient: { type: String },
  },
  { timestamps: true },
);
