import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentSchema } from 'src/agent/schemas/agent.schema';
import { TransactionSchema } from './schemas/transaction.schema';
import { WalletSchema } from 'src/common/schemas/wallet.schema';
import { AgentModule } from 'src/agent/agent.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Agent', schema: AgentSchema },
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'Wallet', schema: WalletSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
