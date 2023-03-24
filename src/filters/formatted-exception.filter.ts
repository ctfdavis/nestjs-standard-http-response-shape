import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FormattedException } from '../types/formatted-exception.interface';
import { Status } from '../types/status.enum';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { FORMATTED_MESSAGE_METADATA } from '../constants';
import { NotUndefined } from '../types/not-undefined.type';

@Catch()
export class FormattedExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly reflector: Reflector) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const code = exception instanceof HttpException ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        let payload: NotUndefined = null;
        if (exception instanceof HttpException) {
            const exceptionResponse = (exception as HttpException).getResponse();
            if (typeof exceptionResponse === 'string') {
                payload = { message: exceptionResponse };
            } else {
                payload = exceptionResponse;
            }
        } else if (exception instanceof Error && exception.message) {
            payload = { message: exception.message };
        }

        const messages = exception instanceof HttpException ? this.reflector.get<string[]>(FORMATTED_MESSAGE_METADATA, exception.constructor) || [] : [];

        const formattedException: FormattedException = {
            status: Status.ERROR,
            messages,
            payload,
            code
        };

        httpAdapter.reply(ctx.getResponse(), formattedException, code);
    }
}
