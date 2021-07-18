import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JWTStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from './config/jwt.config';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConfig.secret,
			signOptions: {
				expiresIn: '3d',
			},
		}),
	],
	providers: [AuthService, JWTStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
