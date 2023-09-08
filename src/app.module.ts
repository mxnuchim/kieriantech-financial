import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentModule } from './agent/agent.module';
import { TransactionModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AgentController } from './agent/agent.controller';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AgentModule,
    TransactionModule,
  ],
  controllers: [AppController, AgentController, TransactionController],
  providers: [AppService],
})
export class AppModule {}
