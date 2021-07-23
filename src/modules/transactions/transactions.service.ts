import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { GetTransactionPeriodDTO } from './dto/getTransactionPeriod.dto';

@Injectable()
export class TransactionsService {
	constructor(private readonly prismaService: PrismaService) {}

	async createTransaction({
		type,
		userId,
		value,
	}: CreateTransactionDTO): Promise<Transaction> {
		const parsedValue = value * 100;

		const transaction = await this.prismaService.transaction.create({
			data: {
				type,
				value: parsedValue,
				userId,
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
		const period = new Date(year, mouth);

		const transactions = this.prismaService.transaction.findMany({
			where: {
				created_at: {
					lte: period,
				},
				userId,
			},
		});

		return transactions;
	}
}
