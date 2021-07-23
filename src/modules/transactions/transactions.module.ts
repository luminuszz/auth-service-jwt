import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
	imports: [PrismaModule],
	providers: [TransactionsService],
	controllers: [TransactionsController],
})
export class TransactionsModule {}
