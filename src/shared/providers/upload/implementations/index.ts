import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUploadProvider } from '../contracts/upload.provider';

import { UploadLocalImplementation } from './local.implementation';

export const UploadProviderFactory: Provider = {
	provide: IUploadProvider,
	useFactory: (configService: ConfigService<EnvVariables>) => {
		return configService.get('NODE_ENV') === 'development'
			? new UploadLocalImplementation(configService)
			: new UploadLocalImplementation(configService);
	},

	inject: [ConfigService],
};
