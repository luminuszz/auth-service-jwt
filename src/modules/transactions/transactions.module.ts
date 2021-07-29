import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { queues } from './jobs/queues';
import { ReportConsumer } from './jobs/report.consumer';
import { TransactionReportService } from './transactionReport.service';

@Module({
	imports: [BullModule.registerQueue(...queues), PrismaModule],
	providers: [TransactionsService, TransactionReportService, ReportConsumer],
	controllers: [TransactionsController],
})
export class TransactionsModule {}
