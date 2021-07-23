import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain, plainToClass } from 'class-transformer';

export interface Response<T> {
	data: T;
}

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, Response<T>>
{
	constructor(private readonly reflector: Reflector) {}

	private parseValue(
		validatorClass: any,
		payloadStream: Record<string, any> | Array<any>,
	): any {
		if (payloadStream instanceof Array) {
			return payloadStream.map((item) => {
				const instanceValidator = new validatorClass(item);

				return classToPlain(instanceValidator);
			});
		} else {
			const instanceValidator = new validatorClass(payloadStream);

			const transformToPlain = classToPlain(instanceValidator);

			return transformToPlain;
		}
	}

	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> {
		const validatorClass =
			this.reflector.get<any>('transformer', context.getClass()) ||
			this.reflector.get<any>('transformer', context.getHandler());

		return next
			.handle()
			.pipe(
				map((data) =>
					validatorClass ? this.parseValue(validatorClass, data) : data,
				),
			);
	}
}
