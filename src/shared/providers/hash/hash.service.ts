import { Injectable } from '@nestjs/common';
import { IHashProvider } from './models/hash.provider';

@Injectable()
export class HashService {
	constructor(private readonly hashProvider: IHashProvider) {}

	async createHash(value: string): Promise<string> {
		return this.hashProvider.createHash(value);
	}

	async compareHash(value: string, hashValue: string) {
		return this.hashProvider.compare(value, hashValue);
	}
}
