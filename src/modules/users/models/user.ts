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
	get getFullAvatarUrl(): string {
		return process.env.NODE_ENV === 'dev'
			? `${process.env.API_ADDRESS}/users/files/avatar/${this.avatar}`
			: `${process.env.API_ADDRESS}/users/files/avatar/${this.avatar}`;
	}

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}
}
