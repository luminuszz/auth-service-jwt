import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

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
})
export class AppModule {}
