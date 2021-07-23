import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './shared/interceptors/parseResponse.interceptor';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TransactionsModule,
	],

	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor,
		},
	],
})
export class AppModule {}
