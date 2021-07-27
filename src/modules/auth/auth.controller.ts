import { Body, Post, Controller } from '@nestjs/common';

import { CreateLoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Parse } from 'src/shared/decorators/parse.decorator';
import { ResponseLogin } from './models/login.model';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Parse(ResponseLogin)
	@Post('login')
	async login(@Body() { email, password }: CreateLoginDTO) {
		return this.authService.login({
			email,
			password,
		});
	}
}
