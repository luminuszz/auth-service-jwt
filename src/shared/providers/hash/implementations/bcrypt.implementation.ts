import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { IHashProvider } from '../contracts/hash.provider';

@Injectable()
export class BcryptHashImplementation implements IHashProvider {
	async createHash(value: string, salts = 4): Promise<string> {
		const hash = await bcryptjs.hash(value, salts);

		return hash;
	}
	async compare(value: string, hashValue: string): Promise<boolean> {
		return bcryptjs.compare(value, hashValue);
	}
}
