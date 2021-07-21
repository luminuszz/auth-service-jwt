import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUploadProvider } from '../upload.provider';

import { UploadLocalImplementation } from './local.implementation';

export const UploadProviderFactory: Provider = {
	provide: IUploadProvider,
	useFactory: (configService: ConfigService<EnvVariables>) => {
		return configService.get('NODE_ENV') === 'development'
			? UploadLocalImplementation
			: UploadLocalImplementation;
	},

	inject: [ConfigService],
};
