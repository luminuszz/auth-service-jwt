import { Injectable } from '@nestjs/common';
import { IUploadProvider } from './upload.provider';

@Injectable()
export class UploadService {
	constructor(private readonly uploadProvider: IUploadProvider) {}

	async saveFile(file: Express.Multer.File) {
		return this.uploadProvider.saveFile(file);
	}

	async deleteFile(fileId: string) {
		return this.uploadProvider.deleteFile(fileId);
	}
}
