import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { FormattedException } from '../types/formatted-exception.interface';
import { Status } from '../types/status.enum';
import { Reflector } from '@nestjs/core';
import { FORMATTED_MESSAGE_METADATA } from '../constants';

@Catch()
export class FormattedExceptionFilter<T> implements ExceptionFilter {
    constructor(private readonly reflector: Reflector) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const code = exception instanceof HttpException ? exception.getStatus() : 500;

        const payload = exception instanceof HttpException ? (exception.getResponse() as T) : null;

        const messages =
            exception instanceof HttpException ? this.reflector.get<string[]>(FORMATTED_MESSAGE_METADATA, exception.constructor) || [] : exception instanceof Error ? [exception.message] : [];

        const formattedException: FormattedException<T> = {
            status: Status.ERROR,
            messages,
            payload,
            code
        };

        if (response.status(code).json) {
            // Express
            response.status(code).json(formattedException);
        } else {
            // Fastify
            response.status(code).send(formattedException);
        }
    }
}
