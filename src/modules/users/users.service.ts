import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { HashService } from 'src/shared/providers/hash/hash.service';
import { UploadService } from 'src/shared/providers/upload/upload.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './models/user';

type AvatarImage = Express.Multer.File;

@Injectable()
export class UsersService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly uploadService: UploadService,
		private readonly hashService: HashService,
	) {}

	async create(createUserDTO: CreateUserDTO): Promise<User> {
		const { email, password } = createUserDTO;
		const verifyUserExists = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (verifyUserExists) throw new BadRequestException('User already exists');

		const passwordHash = await this.hashService.createHash(password);
		const user = await this.prismaService.user.create({
			data: {
				...createUserDTO,
				password: passwordHash,
			},
		});

		return user;
	}

	async findByEmail(email: string): Promise<User | undefined> {
		return this.prismaService.user.findUnique({
			where: { email },
		});
	}

	async findById(id: string): Promise<User | undefined> {
		return this.prismaService.user.findUnique({
			where: { id },
		});
	}

	async uploadAvatarImage(avatarImage: AvatarImage, id: string): Promise<User> {
		const verifyUserExists = await this.findById(id);

		if (!verifyUserExists) throw new BadRequestException('User not found');

		const imageUrl = await this.uploadService.saveFile(avatarImage);

		const user = await this.prismaService.user.update({
			where: {
				id,
			},
			data: {
				avatarUrl: imageUrl,
			},
		});

		return user;
	}
}
