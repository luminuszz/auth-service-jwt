import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { unlink, writeFile } from 'fs/promises';

import { IUploadProvider } from '../upload.provider';

@Injectable()
export class UploadLocalImplementation implements IUploadProvider {
	private storagePath = join('/', 'home', 'temp');

	constructor(private readonly configService: ConfigService<EnvVariables>) {}

	async saveFile(file: Express.Multer.File): Promise<string> {
		const hashCode = Date.now().toString();

		const imageId = `${hashCode}-${file.originalname}`;

		const storagePath = join(this.storagePath, imageId);

		await writeFile(storagePath, file.buffer);

		const apiAddress = this.configService.get('API_ADDRESS');

		const imagePath = join(apiAddress, 'users', 'files', 'avatar', imageId);

		return imagePath;
	}
	async deleteFile(fileId: string): Promise<void> {
		await unlink(join(this.storagePath, fileId));
	}
}
