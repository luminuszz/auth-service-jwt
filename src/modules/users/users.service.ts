import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { HashService } from 'src/shared/providers/hash/hash.service';
import { UploadService } from 'src/shared/providers/upload/upload.service';
import { CreateUserDTO } from './dto/createUser.dto';

type AvatarImage = Express.Multer.File;

@Injectable()
export class UsersService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly uploadService: UploadService,
		private readonly hashService: HashService,
	) {}

	public async create(createUserDTO: CreateUserDTO) {
		const { email, password } = createUserDTO;

		const verifyUserExists = await this.prismaService.user.findFirst({
			where: {
				email,
			},
		});

		console.log(verifyUserExists);

		if (verifyUserExists) {
			throw new BadRequestException('User already exists');
		}

		const passwordHash = await this.hashService.createHash(password);

		const user = await this.prismaService.user.create({
			data: {
				...createUserDTO,
				password: passwordHash,
			},
		});

		return user;
	}

	public async findByEmail(email: string) {
		const user = await this.prismaService.user.findUnique({
			where: { email },
		});

		return user;
	}

	async findById(id: string) {
		const user = this.prismaService.user.findUnique({
			where: { id },
			include: {
				transactions: true,
			},
		});

		return user;
	}

	public async uploadAvatarImage(avatarImage: AvatarImage, id: string) {
		const verifyUserExists = await this.findById(id);

		if (!verifyUserExists) throw new BadRequestException('User not found');

		const hashName = `${Date.now().toString()}-${avatarImage.originalname}`;

		await this.uploadService.saveFile(avatarImage, hashName);

		const user = await this.prismaService.user.update({
			where: {
				id,
			},
			data: {
				avatar: hashName,
			},
		});

		if (verifyUserExists.avatar) {
			await this.uploadService.deleteFile(verifyUserExists.avatar);
		}

		return user;
	}
}
