import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { HashModule } from 'src/shared/providers/hash/hash.module';
import { UploadModuleProvider } from '../../shared/providers/upload/upload.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TransformInterceptor } from 'src/shared/interceptors/parseResponse.interceptor';
import { User } from './models/user';

@Module({
	imports: [PrismaModule, UploadModuleProvider, HashModule],
	providers: [
		UsersService,
		User,
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor,
		},
	],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
