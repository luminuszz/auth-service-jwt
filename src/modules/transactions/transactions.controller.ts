import {
	Body,
	Controller,
	Post,
	Get,
	Param,
	ParseIntPipe,
} from '@nestjs/common';

import { Transaction } from './models/transaction.model';
import { UserRequest } from '../auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { Parse } from 'src/shared/decorators/parse.decorator';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { TransactionsService } from './transactions.service';
import { GetTransactionResume } from './models/getTransactionsResume.model';

@Auth()
@Parse(Transaction)
@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionService: TransactionsService) {}

	@Post()
	async create(
		@Body() createTransactionDTO: CreateTransactionDTO,
		@UserRequest('id') userId: string,
	) {
		return this.transactionService.createTransaction({
			...createTransactionDTO,
			userId,
		});
	}

	@Get('transaction/:id')
	async getOneTransaction(@Param('id') id: string) {
		return this.transactionService.getOneTransactionById(id);
	}

	@Get('period/:year/:mouth')
	async getAllTransactions(
		@Param('year', ParseIntPipe) year: number,
		@Param('mouth', ParseIntPipe) mouth: number,
		@UserRequest('id') userId: string,
	) {
		return this.transactionService.getTransactionsByPeriod({
			mouth,
			userId,
			year,
		});
	}

	@Parse(GetTransactionResume)
	@Get('resume')
	async getTransactionsResume(@UserRequest('id') userId: string) {
		const transactions = await this.transactionService.getUserResumeTransactions(
			userId,
		);

		return transactions;
	}
}
