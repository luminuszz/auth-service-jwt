import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { HashProviderFactory } from './implementations';

@Module({
	providers: [HashProviderFactory, HashService],
	exports: [HashService],
})
export class HashModule {}
