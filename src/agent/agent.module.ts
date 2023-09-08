import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentSchema } from './schemas/agent.schema';
import { TransactionSchema } from 'src/transaction/schemas/transaction.schema';
import { WalletSchema } from 'src/common/schemas/wallet.schema';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Agent', schema: AgentSchema },
      { name: 'Wallet', schema: WalletSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
