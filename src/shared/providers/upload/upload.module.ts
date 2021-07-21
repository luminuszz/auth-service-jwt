import { Module } from '@nestjs/common';

import { UploadService } from './upload.service';
import { UploadProviderFactory } from './implementations';

@Module({
	providers: [UploadService, UploadProviderFactory],

	exports: [UploadService],
})
export class UploadModuleProvider {}
