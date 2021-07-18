import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './models/user';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDTO: CreateUserDTO): Promise<User> {
		const { email, password } = createUserDTO;
		const verifyUserExists = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (verifyUserExists) throw new BadRequestException('User already exists');

		const passwordHash = await hash(password, 4);
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
}
