import { HttpException, SetMetadata } from '@nestjs/common';
import { FORMATTED_MESSAGE_METADATA } from '../constants';

export function FormattedMessages(messages: string | string[], exception?: HttpException) {
    if (exception) {
        const newException = Object.create(exception);
        Reflect.defineMetadata(FORMATTED_MESSAGE_METADATA, messages, newException.constructor);
        return newException;
    } else {
        if (typeof messages === 'string') {
            messages = [messages];
        }
        return SetMetadata(FORMATTED_MESSAGE_METADATA, messages);
    }
}
