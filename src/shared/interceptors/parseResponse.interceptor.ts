import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, classToClass, classToPlain } from 'class-transformer';

export interface Response<T> {
	data: T;
}

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, Response<T>>
{
	constructor(private readonly reflector: Reflector) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> {
		const validatorClass =
			this.reflector.get<any>('transformer', context.getClass()) ||
			this.reflector.get<any>('transformer', context.getHandler());

		return next.handle().pipe(
			map((data) => {
				if (validatorClass) {
					const instanceValidator = new validatorClass(data);

					const transformToPlain = classToPlain(instanceValidator);

					return transformToPlain as any;
				}

				return data;
			}),
		);
	}
}
