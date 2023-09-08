import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/transaction/interfaces/transaction.interface';
import { TransactionService } from 'src/transaction/transaction.service';
import { responseHandler } from 'src/utils/responseHandler';
import { Wallet } from 'src/common/interfaces/wallet.interface';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from './interfaces/agent.interface';
import { generateAgentId } from 'src/utils/generateAgentId';

@Injectable()
export class AgentService {
  logger = new Logger();
  constructor(
    @InjectModel('Agent') private readonly agentModel: Model<Agent>,
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async createAgent(createAgentDto: CreateAgentDto) {
    try {
      const name = createAgentDto?.name?.trim();
      const pin = createAgentDto?.pin?.trim();
      const phone = createAgentDto?.phone?.trim();
      const generatedAgentId = generateAgentId();

      const exists = await this.agentModel.findOne({
        phone: phone,
      });

      if (Boolean(exists)) {
        return responseHandler({
          success: false,
          data: [
            new HttpException('Phone number is in use', HttpStatus.BAD_REQUEST),
          ],
          message: 'Phone number is in use',
        });
      }

      const agent = {
        name,
        pin,
        phone,
        agentId: generatedAgentId,
        balance: 10000,
      };

      const newAgent = await this.agentModel.create(agent);

      const wallet = await this.walletModel.create({
        balance: 10000,
        walletId: generatedAgentId,
        owner: newAgent?._id,
      });

      if (!newAgent || !wallet) {
        return responseHandler({
          success: false,
          data: [
            new HttpException(
              'Something went wrong',
              HttpStatus.NOT_IMPLEMENTED,
            ),
          ],
          message: 'Something went wrong, please try again',
        });
      }

      return responseHandler({
        success: true,
        data: [newAgent],
        message: 'Agent successfully created',
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async fetchAgents() {
    try {
      const agents = await this.agentModel
        .find({})
        .select(['-updatedAt', '-createdAt', '-__v', '-_id']);

      if (!agents || Boolean(agents.length < 1)) {
        return responseHandler({
          success: false,
          data: [new HttpException('No agents found', HttpStatus.NOT_FOUND)],
          message: 'No agents found, please try again',
        });
      }

      return responseHandler({
        success: true,
        data: agents,
        message: 'Agents successfully fetched',
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async fetchAgentByAgentId(agentId: string) {
    try {
      const agent = await this.agentModel.findOne({ agentId: agentId });
      if (!agent) {
        return responseHandler({
          success: false,
          data: [new HttpException('Agent not found', HttpStatus.NOT_FOUND)],
          message: 'Agent not found, please try again',
        });
      }

      return responseHandler({
        success: true,
        data: [agent],
        message: 'Agent successfully fetched',
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteAgent(agentId: string) {
    try {
      const agentFromDB = await this.agentModel.findOne({ agentId: agentId });
      if (!agentFromDB) {
        return responseHandler({
          success: false,
          data: [new HttpException('Agent not found', HttpStatus.NOT_FOUND)],
          message: 'Agent not found, please try again',
        });
      }
      const agent = await this.agentModel.findByIdAndDelete(agentFromDB?._id);

      return responseHandler({
        success: true,
        data: [agent],
        message: 'Agent successfully deleted',
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
