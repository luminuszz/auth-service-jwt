import { TransactionReport as PrismaTransactionReport } from '@prisma/client';
import { User } from 'src/modules/users/models/user';

export class TransactionReport implements PrismaTransactionReport {
	reportName: string;
	id: string;
	isReady: boolean | null;
	user: User;
	userId: string;
	created_at: Date;
	updated_at: Date;
}
