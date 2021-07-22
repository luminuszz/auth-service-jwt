import { ConfigService } from '@nestjs/config';
import { IHashProvider } from '../contracts/hash.provider';
import { BcryptHashImplementation } from './bcrypt.implementation';

export const HashProviderFactory = {
	provide: IHashProvider,
	useFactory: (configService: ConfigService<EnvVariables>) =>
		configService.get('NODE_ENV') === 'dev'
			? new BcryptHashImplementation()
			: new BcryptHashImplementation(),

	inject: [ConfigService],
};
