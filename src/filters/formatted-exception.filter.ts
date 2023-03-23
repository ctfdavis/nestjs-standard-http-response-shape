import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FormattedException } from '../types/formatted-exception.interface';
import { Status } from '../types/status.enum';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { FORMATTED_MESSAGE_METADATA } from '../constants';
import { isHttpException } from '../utils/is-http-exception';

@Catch()
export class FormattedExceptionFilter<T> implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly reflector: Reflector) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const code = isHttpException(exception) ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const payload = isHttpException(exception) ? ((exception as HttpException).getResponse() as T) : null;

        const messages = exception instanceof Error ? this.reflector.get<string[]>(FORMATTED_MESSAGE_METADATA, exception.constructor) || (exception.message ? [exception.message] : []) : [];

        const formattedException: FormattedException<T> = {
            status: Status.ERROR,
            messages,
            payload,
            code
        };

        httpAdapter.reply(ctx.getResponse(), formattedException, code);
    }
}
