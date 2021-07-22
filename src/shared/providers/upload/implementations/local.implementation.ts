import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';

import { IUploadProvider } from '../contracts/upload.provider';
import { SaveFileDTO } from '../dto/saveImage.dto';

@Injectable()
export class UploadLocalImplementation implements IUploadProvider {
	private storagePath = join('/', 'home', 'temp');

	constructor(private readonly configService: ConfigService<EnvVariables>) {}

	async saveFile({ fileBuffer, fileName }: SaveFileDTO): Promise<string> {
		const storagePath = join(this.storagePath, fileName);

		await writeFile(storagePath, fileBuffer);

		const apiAddress = this.configService.get('API_ADDRESS');

		const imagePath = join(apiAddress, 'users', 'files', 'avatar', fileName);

		return imagePath;
	}
	async deleteFile(fileName: string): Promise<void> {
		await unlink(join(this.storagePath, fileName));
	}
}
