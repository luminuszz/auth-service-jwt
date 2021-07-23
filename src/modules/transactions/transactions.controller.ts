import { Body, Controller, Post, Get, Param } from '@nestjs/common';

import { Transaction } from './models/transaction.model';
import { UserRequest } from '../auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { Parse } from 'src/shared/decorators/parse.decorator';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { TransactionsService } from './transactions.service';

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

	@Get(':id')
	async getOneTransaction(@Param('id') id: string) {
		return this.transactionService.getOneTransactionById(id);
	}

	@Get('period/:year/:mouth')
	async getAllTransactions(
		@Param() params: { year: number; mouth: number },
		@UserRequest('id') userId: string,
	) {
		const { mouth, year } = params;

		return this.transactionService.getTransactionsByPeriod({
			mouth,
			userId,
			year,
		});
	}
}
