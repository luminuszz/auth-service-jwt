import { Body, Post, Controller, Get } from '@nestjs/common';

import { CreateUserDTO } from './dto/createUser.dto';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UsersService } from './users.service';

@Controller('users')
@Auth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDTO) {
		const user = await this.usersService.create(createUserDto);

		return user;
	}

	@Get('me')
	async getCurrentUser(@User('id') userId: string) {
		const currentUser = await this.usersService.findById(userId);

		return currentUser;
	}
}
