import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type PayloadUser = {
	email: string;
	id: string;
	name: string;
};

type PayloadUserKey = keyof PayloadUser;

export const User = createParamDecorator(
	(userKey: PayloadUserKey, ctx: ExecutionContext) => {
		const { user } = ctx.switchToHttp().getRequest<{ user: PayloadUser }>();

		return user[userKey] || user;
	},
);
