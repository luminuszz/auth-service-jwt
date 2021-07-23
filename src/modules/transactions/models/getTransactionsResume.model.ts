import { Transform, Type } from 'class-transformer';
import { Transaction } from './transaction.model';

export class GetTransactionResume {
	@Type(() => Transaction)
	transactions: Transaction[];

	@Transform(({ value }) => value / 100)
	incoming: number;

	@Transform(({ value }) => value / 100)
	out: number;

	constructor(partial: Partial<GetTransactionResume>) {
		Object.assign(this, partial);
	}
}
