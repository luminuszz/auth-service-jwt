import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
})
export class AppModule {}
