import {
	Category,
	Transaction as PrismaTransaction,
	TransactionType,
} from '@prisma/client';

import { Transform } from 'class-transformer';
import { User } from 'src/modules/users/models/user';

export class Transaction implements PrismaTransaction {
	id: string;

	@Transform(({ value }) => value / 100)
	value: number;

	type: TransactionType;

	description: string | null;

	userId: string;

	created_at: Date;

	updated_at: Date;

	category: Category | null;

	user?: User;

	constructor(partial: Partial<Transaction>) {
		Object.assign(this, partial);
	}
}
