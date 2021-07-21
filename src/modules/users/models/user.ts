import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	password: string;
	avatarUrl: string;
	avatar: string;
	updated_at: Date;
	created_at: Date;
}
