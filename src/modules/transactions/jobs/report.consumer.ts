import {
	OnQueueCompleted,
	OnQueueFailed,
	Process,
	Processor,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { createWriteStream } from 'fs';
import { join } from 'path';
import PdfMakeGenerator from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { TransactionReportService } from '../transactionReport.service';
import { TransactionsService } from '../transactions.service';
import { QueueKey } from './queues';

interface ReportPayload {
	year: number;
	mouth: number;
	userId: string;
	reportId: string;
	reportName: string;
}

@Processor(QueueKey.reportConsumer)
@Injectable()
export class ReportConsumer {
	private fonts = {
		Helvetica: {
			normal: 'Helvetica',
			bold: 'Helvetica-Bold',
			italics: 'Helvetica-Oblique',
			bolditalics: 'Helvetica-BoldOblique',
		},
	};

	constructor(
		private readonly transactionService: TransactionsService,
		private readonly transactionReportService: TransactionReportService,
	) {}

	@Process()
	async generateReport({ data }: Job<ReportPayload>) {
		console.log('PdfMakeGenerator', PdfMakeGenerator);

		const pdfmake = new PdfMakeGenerator(this.fonts);

		const transactions = await this.transactionService.getTransactionsByPeriod({
			...data,
		});

		const formatTransactions = transactions.map((tr) => [
			tr.id,
			tr.type,
			Intl.NumberFormat('pt-br', {
				currency: 'BRL',
				style: 'currency',
				maximumFractionDigits: 2,
			}).format(tr.value),
		]);

		const doc: TDocumentDefinitions = {
			defaultStyle: {
				font: 'Helvetica',
			},
			content: {
				table: {
					headerRows: 1,
					body: [['id', 'Tipo', 'Valor'], ...formatTransactions],
				},
			},
		};

		const pdf = pdfmake.createPdfKitDocument(doc);

		const path = join('/', 'home', 'temp', data.reportName);

		console.log('path', path);

		pdf.pipe(createWriteStream(path));

		pdf.end();

		return data.reportId;
	}

	@OnQueueCompleted()
	async finishReport(job: Job, result: string) {
		console.log(result);
		const reportId = job.returnvalue;

		await this.transactionReportService.finishPdf(reportId);
	}

	@OnQueueFailed()
	async handle(job: Job<ReportPayload>, err) {
		console.log(err);
		await this.transactionReportService.deleteReport(job.data.reportId);
	}
}
