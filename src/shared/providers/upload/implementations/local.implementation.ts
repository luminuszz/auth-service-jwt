import { Injectable } from '@nestjs/common';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { IUploadProvider } from '../contracts/upload.provider';
import { SaveFileDTO } from '../dto/saveImage.dto';

@Injectable()
export class UploadLocalImplementation implements IUploadProvider {
	private storagePath = join('/', 'home', 'temp');

	async saveFile({ fileBuffer, fileName }: SaveFileDTO): Promise<void> {
		const storagePath = join(this.storagePath, fileName);

		await writeFile(storagePath, fileBuffer);
	}
	async deleteFile(fileName: string): Promise<void> {
		await unlink(join(this.storagePath, fileName));
	}
}
