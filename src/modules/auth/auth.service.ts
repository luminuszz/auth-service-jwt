import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { User } from '../users/models/user';
import { CreateLoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.usersService.findByEmail(email);

		if (!user) throw new UnauthorizedException('email or password is incorrect');

		const verifyPassword = await compare(password, user.password);

		if (!verifyPassword)
			throw new UnauthorizedException('email or password is incorrect');

		return user;
	}

	async login({ email, password }: CreateLoginDTO): Promise<any> {
		const user = await this.validateUser(email, password);

		if (!user) throw new UnauthorizedException('Invalid credentials');

		const payload = await this.jwtService.signAsync({
			email: user.email,
			id: user.id,
			name: user.name,
		});

		return {
			access_token: payload,
		};
	}
}
