import { OmitType } from '@nestjs/mapped-types';
import { User } from '../models/user';

export class CreateUserDTO extends OmitType(User, [
	'id',
	'created_at',
	'updated_at',
] as const) {}
