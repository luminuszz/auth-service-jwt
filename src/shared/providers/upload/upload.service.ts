import { Injectable } from '@nestjs/common';
import { IUploadProvider } from './contracts/upload.provider';

@Injectable()
export class UploadService {
	constructor(private readonly uploadProvider: IUploadProvider) {}

	async saveFile(file: Express.Multer.File, fileName: string) {
		return this.uploadProvider.saveFile({
			fileBuffer: file.buffer,
			fileName,
		});
	}

	async deleteFile(fileId: string) {
		return this.uploadProvider.deleteFile(fileId);
	}
}
