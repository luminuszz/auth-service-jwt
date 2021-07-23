import {
	Transaction as PrismaTransaction,
	TransactionType,
} from '@prisma/client';

export class Transaction implements PrismaTransaction {
	id: string;
	value: number;
	type: TransactionType;
	userId: string;
	created_at: Date;
	updated_at: Date;
}
