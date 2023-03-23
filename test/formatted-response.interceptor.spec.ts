import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { FormattedResponseInterceptor } from '../src';
import { Reflector } from '@nestjs/core';

describe('FormattedResponseInterceptor', () => {
    let interceptor: FormattedResponseInterceptor<any>;
    let reflector: Reflector;
    let context: ExecutionContext;
    let next: any;

    beforeEach(() => {
        reflector = new Reflector();
        interceptor = new FormattedResponseInterceptor<any>(reflector);
        context = {
            switchToHttp: () => ({
                getRequest: () => ({
                    method: 'GET',
                    url: '/test'
                }),
                getResponse: () => ({
                    statusCode: 200
                })
            }),
            getHandler: jest.fn()
        } as unknown as ExecutionContext;
        next = {
            handle: jest.fn()
        };
    });

    it('should transform response shape', async () => {
        // Arrange
        const payload = { test: 'test' };
        const messages = ['test message'];
        next.handle.mockImplementation(() => of(payload));
        jest.spyOn(reflector, 'get').mockImplementation(() => messages);
        const expected = {
            status: 'ok',
            code: 200,
            messages,
            payload
        };
        // Act
        const actual = await interceptor.intercept(context, next).toPromise();
        // Assert
        expect(actual).toEqual(expected);
    });
});
