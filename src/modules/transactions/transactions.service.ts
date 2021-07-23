import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { getDate, endOfMonth, startOfMonth } from 'date-fns';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { GetTransactionPeriodDTO } from './dto/getTransactionPeriod.dto';

@Injectable()
export class TransactionsService {
	constructor(private readonly prismaService: PrismaService) {}

	async createTransaction({
		type,
		userId,
		value,
		category,
	}: CreateTransactionDTO): Promise<Transaction> {
		const parsedValue = value * 100;

		const transaction = await this.prismaService.transaction.create({
			data: {
				type,
				value: parsedValue,
				userId,
				category,
			},
		});

		return transaction;
	}

	async getOneTransactionById(transactionId: string) {
		const transaction = await this.prismaService.transaction.findUnique({
			where: {
				id: transactionId,
			},
		});

		return transaction;
	}

	async getTransactionsByPeriod({
		mouth,
		userId,
		year,
	}: GetTransactionPeriodDTO) {
		const queryDate = new Date(mouth, year);

		const lastDateOfMouth = getDate(endOfMonth(queryDate));

		const initialDateOfMouth = getDate(startOfMonth(queryDate));

		const finallyPeriod = new Date(year, mouth, lastDateOfMouth);

		const initialPeriod = new Date(year, mouth, initialDateOfMouth);

		const transactions = this.prismaService.transaction.findMany({
			where: {
				created_at: {
					lte: finallyPeriod,
					gte: initialPeriod,
				},
				userId,
			},
		});

		return transactions;
	}

	async getUserResumeTransactions(userId: string) {
		const currentDate = new Date();

		const transactions = await this.getTransactionsByPeriod({
			mouth: currentDate.getMonth(),
			year: currentDate.getFullYear(),
			userId,
		});

		const { incoming, out } = transactions.reduce(
			(acc, current) => {
				current.type === 'INCOMING'
					? (acc.incoming = +current.value)
					: (acc.out = +current.value);

				return acc;
			},
			{
				incoming: 0,
				out: 0,
			},
		);

		console.log(transactions, incoming, out);

		return {
			transactions,
			incoming,
			out,
		};
	}
}
