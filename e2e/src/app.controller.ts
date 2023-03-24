import { BadRequestException, Controller, Get, HttpException } from '@nestjs/common';
import { FormattedMessages } from '../../src';

@Controller()
export class AppController {
    @Get('/string')
    @FormattedMessages('message for getString')
    getString() {
        return 'Hello world!';
    }

    @Get('/number')
    @FormattedMessages('message for getNumber')
    getNumber() {
        return 42;
    }

    @Get('/boolean')
    @FormattedMessages('message for getBoolean')
    getBoolean() {
        return true;
    }

    @Get('/array')
    @FormattedMessages(['message for getArray', 'message for getArray'])
    getArray() {
        return ['Hello', 'world'];
    }

    @Get('/object')
    getObject() {
        return {
            foo: 'bar'
        };
    }

    @Get('/empty')
    getEmpty() {}

    @Get('/http-exception')
    getHTTPException() {
        throw FormattedMessages('message for getHTTPException', new HttpException('http exception', 403));
    }

    @Get('/not-http-exception')
    getNotHTTPException() {
        throw FormattedMessages('message for getNotHTTPException', new Error('not http exception'));
    }

    @Get('/bad-request-exception')
    getBadRequestException() {
        throw FormattedMessages(
            'message for getBadRequestException',
            new BadRequestException({
                error: 'testing bad request'
            })
        );
    }
}
