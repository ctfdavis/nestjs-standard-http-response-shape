import { ArgumentsHost, HttpException } from '@nestjs/common';
import { FormattedExceptionFilter } from '../src';
import { Reflector } from '@nestjs/core';
import { FORMATTED_MESSAGE_METADATA } from '../src/constants';
import { Status } from '../src/types/status.enum';

describe('FormattedExceptionFilter', () => {
    let filter: FormattedExceptionFilter<any>;
    let reflector: Reflector;
    let response: any;

    beforeEach(() => {
        reflector = new Reflector();
        filter = new FormattedExceptionFilter(reflector);
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

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({
            status: Status.ERROR,
            messages: ['Error message 1', 'Error message 2'],
            payload: 'Test Payload',
            code: 404
        });
    });

    it('should handle HttpException without formatted messages', () => {
        const testException = new HttpException('Test Payload', 400);
        Reflect.defineMetadata(FORMATTED_MESSAGE_METADATA, undefined, testException.constructor);

        filter.catch(testException, <ArgumentsHost>mockArgumentsHost);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            status: Status.ERROR,
            messages: [],
            payload: 'Test Payload',
            code: 400
        });
    });

    it('should handle non-HttpException as a 500 error', () => {
        const errorMsg = 'Unexpected error';
        const testException = new Error(errorMsg);

        filter.catch(testException, <ArgumentsHost>mockArgumentsHost);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            status: Status.ERROR,
            messages: [errorMsg],
            payload: null,
            code: 500
        });
    });
});
