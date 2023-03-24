import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FORMATTED_MESSAGE_METADATA } from '../constants';
import { FormattedResponse } from '../types/formatted-response.interface';
import { Status } from '../types/status.enum';
import { NotUndefined } from '../types/not-undefined.type';

@Injectable()
export class FormattedResponseInterceptor<T extends NotUndefined> implements NestInterceptor<T, FormattedResponse<T>> {
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<FormattedResponse<T>> {
        return next.handle().pipe(
            map((payload) => {
                const code = context.switchToHttp().getResponse().statusCode;
                const messages = this.reflector.get<string[]>(FORMATTED_MESSAGE_METADATA, context.getHandler()) || [];
                return {
                    status: Status.OK,
                    code,
                    messages,
                    payload: payload || null
                };
            })
        );
    }
}
