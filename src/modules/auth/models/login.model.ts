import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/modules/users/models/user';

@Exclude()
export class ResponseLogin extends User {
	@Expose()
	id: string;

	@Expose()
	email: string;

	@Expose()
	name: string;

	@Expose()
	access_token: string;
}
