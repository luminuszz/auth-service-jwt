import {
	Category,
	Transaction as PrismaTransaction,
	TransactionType,
} from '@prisma/client';

import { Transform } from 'class-transformer';

export class Transaction implements PrismaTransaction {
	id: string;

	@Transform(({ value }) => value / 100)
	value: number;

	type: TransactionType;

	userId: string;

	created_at: Date;

	updated_at: Date;

	category: Category;

	constructor(partial: Partial<Transaction>) {
		Object.assign(this, partial);
	}
}
