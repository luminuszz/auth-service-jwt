import { Injectable } from '@nestjs/common';
import { IHashProvider } from './contracts/hash.provider';

@Injectable()
export class HashService {
	constructor(private readonly hashProvider: IHashProvider) {}

	async createHash(value: string): Promise<string> {
		const hash = await this.hashProvider.createHash(value);

		return hash;
	}

	async compareHash(value: string, hashValue: string) {
		return this.hashProvider.compare(value, hashValue);
	}
}
