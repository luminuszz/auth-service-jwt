import { Body, Post, Controller } from '@nestjs/common';

import { CreateLoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() { email, password }: CreateLoginDTO) {
		return this.authService.login({
			email,
			password,
		});
	}
}
