import { Res } from '@nestjs/common';
import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { Parse } from 'src/shared/decorators/parse.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRequest } from '../auth/decorators/user.decorator';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { GenerateTransactionReportDTO } from './dto/generateTransactionReport.dto';
import { GetTransactionResume } from './models/getTransactionsResume.model';
import { Transaction } from './models/transaction.model';
import { TransactionReportService } from './transactionReport.service';
import { TransactionsService } from './transactions.service';

@Auth()
@Parse(Transaction)
@Controller('transactions')
export class TransactionsController {
	constructor(
		private readonly transactionService: TransactionsService,
		private readonly transactionReportService: TransactionReportService,
	) {}

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

	@Post('report/create')
	async generateUserTransactionsReport(
		@Body() { mouth, year }: Omit<GenerateTransactionReportDTO, 'userId'>,
		@UserRequest('id') userId: string,
	) {
		return this.transactionReportService.generateTransactionReport({
			mouth,
			userId,
			year,
		});
	}

	@Get('report')
	async getTransactionReport(
		@UserRequest('id') userId: string,
		@Res() res: Response,
	) {
		const [report] = await this.transactionReportService.getLastTransactionReport(
			userId,
		);

		return res.sendFile(join('/', 'home', 'temp', report.reportName));
	}
}
