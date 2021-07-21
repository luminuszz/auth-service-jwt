import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { join } from 'path';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDTO) {
		const user = await this.usersService.create(createUserDto);

		return user;
	}

	@Auth()
	@Get('me')
	async getCurrentUser(@User('id') userId: string) {
		const currentUser = await this.usersService.findById(userId);

		return currentUser;
	}

	@Auth()
	@Post('upload/avatar')
	@UseInterceptors(FileInterceptor('avatar'))
	async uploadAvatar(
		@User('id') userId: string,
		@UploadedFile() avatarImage: Express.Multer.File,
	) {
		return this.usersService.uploadAvatarImage(avatarImage, userId);
	}

	@Get('files/avatar/:id')
	async sendAvatarUrlImage(@Param('id') imageId: string, @Res() res: Response) {
		const path = join('/', 'home', 'temp', imageId);

		return res.sendFile(path);
	}
}
