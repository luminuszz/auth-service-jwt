import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { TransformInterceptor } from './shared/interceptors/parseResponse.interceptor';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		TransactionsModule,
		BullModule.forRoot({
			redis: {
				port: Number(process.env.REDIS_PORT),
				host: process.env.REDIS_HOST,
			},
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],

	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor,
		},
	],
})
export class AppModule {}
