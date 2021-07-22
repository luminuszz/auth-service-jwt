import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
	id: string;
	name: string;
	password: string;
	updated_at: Date;
	email: string;
	created_at: Date;
	avatarUrl: string;
}
