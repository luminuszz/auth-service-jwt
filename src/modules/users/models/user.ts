import { ConfigService } from '@nestjs/config';
import { User as PrismaUser } from '@prisma/client';

import { Exclude, Expose } from 'class-transformer';

export class User implements PrismaUser {
	@Exclude()
	password: string;

	id: string;
	name: string;

	updated_at: Date;
	email: string;
	created_at: Date;
	avatar: string;

	@Expose()
	get avatarPath(): string {
		const instance = new ConfigService<EnvVariables>();

		const { apiAddress, env } = {
			apiAddress: instance.get('API_ADDRESS'),
			env: instance.get('NODE_ENV'),
		};

		return env === 'dev'
			? `${apiAddress}/users/files/avatar/${this.avatar}`
			: `${apiAddress}/users/files/avatar/${this.avatar}`;
	}

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}
}
