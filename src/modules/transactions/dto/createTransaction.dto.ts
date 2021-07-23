import { OmitType } from '@nestjs/mapped-types';

import { Transaction } from '../models/transaction.model';

export class CreateTransactionDTO extends OmitType(Transaction, [
	'created_at',
	'updated_at',
	'id',
]) {}
