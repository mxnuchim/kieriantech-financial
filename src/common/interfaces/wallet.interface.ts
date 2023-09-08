import { Agent } from 'src/agent/interfaces/agent.interface';

export interface Wallet extends Document {
  balance: number;
  walletId: string;
  owner: string;
}
