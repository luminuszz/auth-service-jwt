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
import { UserRequest } from 'src/modules/auth/decorators/user.decorator';
import { User } from './models/user';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { join } from 'path';
import { Parse } from 'src/shared/decorators/parse.decorator';

@Parse(User)
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
	async getCurrentUser(@UserRequest('id') userId: string) {
		const currentUser = await this.usersService.findById(userId);

		return currentUser;
	}

	@Auth()
	@Post('upload/avatar')
	@UseInterceptors(FileInterceptor('avatar'))
	async uploadAvatar(
		@UserRequest('id') userId: string,
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
