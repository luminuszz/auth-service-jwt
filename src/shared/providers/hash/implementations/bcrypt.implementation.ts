import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { IHashProvider } from '../models/hash.provider';

@Injectable()
export class BcryptHashImplementation implements IHashProvider {
	private bcryptjs: typeof bcryptjs = bcryptjs;

	async createHash(value: string, salts = 4): Promise<string> {
		const hash = await this.bcryptjs.hash(value, salts);

		return hash;
	}
	async compare(value: string, hashValue: string): Promise<boolean> {
		return this.bcryptjs.compare(value, hashValue);
	}
}
