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

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);

		if (!user) throw new UnauthorizedException('email or password is incorrect');

		const verifyPassword = await compare(password, user.password);

		if (!verifyPassword)
			throw new UnauthorizedException('email or password is incorrect');

		return user as User;
	}

	async login({ email, password }: CreateLoginDTO): Promise<any> {
		const user = await this.validateUser(email, password);

		if (!user) throw new UnauthorizedException('Invalid credentials');

		const tokenSub = {
			email: user.email,
			id: user.id,
			name: user.name,
			avatarUrl: user.avatarPath,
		};

		console.log(user);

		const payload = await this.jwtService.signAsync(tokenSub);

		return {
			access_token: payload,
			...user,
		};
	}
}
