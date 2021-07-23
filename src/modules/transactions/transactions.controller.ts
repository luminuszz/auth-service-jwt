import { Body, Controller, Post, Get, Param } from '@nestjs/common';

import { User } from '../auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { TransactionsService } from './transactions.service';

@Auth()
@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionService: TransactionsService) {}

	@Post()
	async create(
		@Body() createTransactionDTO: CreateTransactionDTO,
		@User('id') userId: string,
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
		@User('id') userId: string,
	) {
		const { mouth, year } = params;

		return this.transactionService.getTransactionsByPeriod({
			mouth,
			userId,
			year,
		});
	}
}
