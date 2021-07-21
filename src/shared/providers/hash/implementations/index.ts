import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BcryptHashImplementation } from './bcrypt.implementation';
import { IHashProvider } from '../models/hash.provider';

export const HashProviderFactory: Provider = {
	provide: IHashProvider,
	useFactory: (configService: ConfigService<EnvVariables>) => {
		return configService.get('NODE_ENV') === 'development'
			? BcryptHashImplementation
			: BcryptHashImplementation;
	},

	inject: [ConfigService],
};
