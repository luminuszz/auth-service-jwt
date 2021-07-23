import { SetMetadata } from '@nestjs/common';

export const Parse = (classInstance: any) =>
	SetMetadata('transformer', classInstance);
