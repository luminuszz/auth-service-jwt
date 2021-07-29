import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { QueueKey } from './jobs/queues';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { GenerateTransactionReportDTO } from './dto/generateTransactionReport.dto';

@Injectable()
export class TransactionReportService {
	constructor(
		private readonly prismaService: PrismaService,
		@InjectQueue(QueueKey.reportConsumer)
		private readonly reportQueue: Queue,
	) {}

	async create(userId: string) {
		return this.prismaService.transactionReport.create({
			data: {
				reportName: `${userId}-${new Date().toISOString()}-report.pdf`,
				userId,
			},
		});
	}

	async finishPdf(id: string) {
		return this.prismaService.transactionReport.update({
			where: { id },
			data: {
				isReady: true,
			},
		});
	}

	async generateTransactionReport({
		mouth,
		year,
		userId,
	}: GenerateTransactionReportDTO) {
		const transactionReport = await this.create(userId);

		this.reportQueue.add({
			year,
			mouth,
			userId,
			reportId: transactionReport.id,
			reportName: transactionReport.reportName,
		});
	}

	async getLastTransactionReport(userId: string) {
		return this.prismaService.transactionReport.findMany({
			where: {
				userId,
				isReady: true,
			},
			take: 1,
			orderBy: {
				created_at: 'desc',
			},
		});
	}

	async deleteReport(id) {
		return this.prismaService.transactionReport.delete({
			where: { id },
		});
	}
}
