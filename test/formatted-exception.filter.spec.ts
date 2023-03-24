import { ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { FormattedExceptionFilter } from '../src';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { FORMATTED_MESSAGE_METADATA } from '../src/constants';
import { Status } from '../src/types/status.enum';

describe('FormattedExceptionFilter', () => {
    let filter: FormattedExceptionFilter;
    let reflector: Reflector;
    let adapter: HttpAdapterHost;
    let response: any;

    beforeEach(() => {
        reflector = new Reflector();
        adapter = new HttpAdapterHost();
        adapter.httpAdapter = {
            reply: jest.fn()
        } as any;
        filter = new FormattedExceptionFilter(adapter, reflector);
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    const mockArgumentsHost = {
        switchToHttp: () => ({
            getResponse: () => response,
            getRequest: () => {},
            getNext: () => {}
        })
    };

    it('should handle HttpException with formatted messages', () => {
        const testException = new HttpException('Test Payload', 404);
        Reflect.defineMetadata(FORMATTED_MESSAGE_METADATA, ['Error message 1', 'Error message 2'], testException.constructor);

        filter.catch(testException, <ArgumentsHost>mockArgumentsHost);

        expect(adapter.httpAdapter.reply).toHaveBeenCalledWith(
            expect.anything(),
            {
                status: Status.ERROR,
                messages: ['Error message 1', 'Error message 2'],
                payload: 'Test Payload',
                code: 404
            },
            404
        );
    });

    it('should handle HttpException without formatted messages', () => {
        const testException = new HttpException({ error: 'Test Payload' }, 400);
        Reflect.defineMetadata(FORMATTED_MESSAGE_METADATA, undefined, testException.constructor);

        filter.catch(testException, <ArgumentsHost>mockArgumentsHost);

        expect(adapter.httpAdapter.reply).toHaveBeenCalledWith(
            expect.anything(),
            {
                status: Status.ERROR,
                messages: ['Http Exception'],
                payload: { error: 'Test Payload' },
                code: 400
            },
            400
        );
    });

    it('should handle BadRequestException', () => {
        const testException = new BadRequestException({ error: 'Test Payload' });
        Reflect.defineMetadata(FORMATTED_MESSAGE_METADATA, ['testing'], testException.constructor);

        filter.catch(testException, <ArgumentsHost>mockArgumentsHost);

        expect(adapter.httpAdapter.reply).toHaveBeenCalledWith(
            expect.anything(),
            {
                status: Status.ERROR,
                messages: ['testing'],
                payload: { error: 'Test Payload' },
                code: 400
            },
            400
        );
    });

    it('should handle non-HttpException as a 500 error', () => {
        const errorMsg = 'Unexpected error';
        const testException = new Error(errorMsg);

        filter.catch(testException, <ArgumentsHost>mockArgumentsHost);

        expect(adapter.httpAdapter.reply).toHaveBeenCalledWith(
            expect.anything(),
            {
                status: Status.ERROR,
                messages: [errorMsg],
                payload: null,
                code: 500
            },
            500
        );
    });
});
