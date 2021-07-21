import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { HashModule } from './shared/providers/hash/hash.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		HashModule,
	],
})
export class AppModule {}
