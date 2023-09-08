import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from 'src/agent/interfaces/agent.interface';
import { Wallet } from 'src/common/interfaces/wallet.interface';
import { responseHandler } from 'src/utils/responseHandler';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './interfaces/transaction.interface';
import { transactionStatusEnum } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
  logger = new Logger();
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    @InjectModel('Agent') private readonly agentModel: Model<Agent>,
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      const amount = +createTransactionDto?.amount;
      const senderId = createTransactionDto?.senderId;
      const pin = createTransactionDto?.pin;
      const otp = createTransactionDto?.otp;
      const destinationWallet = createTransactionDto?.destinationWallet;

      if (!pin || !otp || !amount || !destinationWallet || !senderId) {
        return responseHandler({
          success: false,
          data: [
            new HttpException('Missing some fields', HttpStatus.BAD_REQUEST),
          ],
          message: 'Missing some fields, please try again',
        });
      }

      const sender: Agent = await this.agentModel.findOne({
        agentId: senderId,
      });

      const recipient: Agent = await this.agentModel.findOne({
        $or: [
          { 'wallet.walletId': destinationWallet },
          { agentId: destinationWallet },
        ],
      });

      if (!sender || !recipient) {
        return responseHandler({
          success: false,
          data: [new HttpException('Agent not found', HttpStatus.NOT_FOUND)],
          message: 'Agent not found, please try again',
        });
      }

      if (otp !== process.env.OTP) {
        return responseHandler({
          success: false,
          data: [
            new HttpException('OTPs do not match', HttpStatus.BAD_REQUEST),
          ],
          message: 'OTPs do not match, please try again',
        });
      }

      if (pin !== sender?.pin) {
        return responseHandler({
          success: false,
          data: [
            new HttpException(
              'Wrong pin, please try again',
              HttpStatus.BAD_REQUEST,
            ),
          ],
          message:
            'You cannot perform this action because your pin is incorrect',
        });
      }

      const senderWallet = await this.walletModel.findOne({
        owner: sender?._id,
      });

      const recepientWallet = await this.walletModel.findOne({
        walletId: destinationWallet,
      });

      if (!senderWallet || !recepientWallet) {
        return responseHandler({
          success: false,
          data: [
            new HttpException('Wallet(s) not found', HttpStatus.NOT_FOUND),
          ],
          message: 'Please check your wallet ID and try again',
        });
      }

      // this.logger.debug({ sender: senderWallet.balance, amount });

      if (+senderWallet.balance < +amount) {
        return responseHandler({
          success: false,
          data: [
            new HttpException(
              'Your balance is too low',
              HttpStatus.BAD_REQUEST,
            ),
          ],
          message: 'Your balance is too low',
        });
      }

      const newSenderBalance = (senderWallet.balance -= amount);

      const newReceiverBalance = (recepientWallet.balance += amount);

      const updatedSenderWallet = await this.walletModel.findByIdAndUpdate(
        senderWallet?._id,
        {
          balance: newSenderBalance,
        },
      );

      const updatedReceiverWallet = await this.walletModel.findByIdAndUpdate(
        recepientWallet?._id,
        {
          balance: newReceiverBalance,
        },
      );

      if (!updatedSenderWallet || !updatedReceiverWallet) {
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

      const newTransaction: Transaction = await this.transactionModel.create({
        amount,
        destinationWallet,
        status: transactionStatusEnum.APROVED,
        sender: sender?.agentId,
        recipient: recipient?.agentId,
      });

      if (!newTransaction) {
        return responseHandler({
          success: false,
          data: [
            new HttpException(
              'Could not create transaction',
              HttpStatus.BAD_REQUEST,
            ),
          ],
          message: 'Could not create transaction, please try again',
        });
      }

      await sender.updateOne({
        $set: {
          balance: newSenderBalance,
        },
      });

      await recipient.updateOne({
        $set: {
          balance: newReceiverBalance,
        },
      });

      this.logger.log(
        `Transaction: ${newTransaction.amount} transferred from ${senderWallet.walletId} to ${recepientWallet.walletId}`,
      );
      return responseHandler({
        success: true,
        data: [newTransaction],
        message: 'Transaction completed successfully',
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async fetchTransactionLogs() {
    try {
      const transactions = await this.transactionModel
        .find({})
        .select(['-updatedAt', '-createdAt', '-__v', '-_id'])
        .sort({
          createdAt: -1,
        });

      if (!transactions || Boolean(transactions.length < 1)) {
        return responseHandler({
          success: false,
          data: [
            new HttpException('No transactions found', HttpStatus.NOT_FOUND),
          ],
          message: 'No transactions found, please try again',
        });
      }

      return responseHandler({
        success: true,
        data: transactions,
        message: 'Transactions fetched successfully',
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
