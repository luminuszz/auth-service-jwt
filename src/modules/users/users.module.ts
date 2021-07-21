import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { HashModule } from 'src/shared/providers/hash/hash.module';
import { UploadModuleProvider } from '../../shared/providers/upload/upload.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [PrismaModule, UploadModuleProvider, HashModule],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
