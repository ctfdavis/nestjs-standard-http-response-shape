import { Controller, Get, HttpException } from '@nestjs/common';
import { FormattedMessages } from '../../src';
import { fixtures } from '../fixtures';

@Controller()
export class AppController {
    @Get(fixtures.paths.getString)
    @FormattedMessages(fixtures.messages.getString)
    getString() {
        return fixtures.values.getString;
    }

    @Get(fixtures.paths.getNumber)
    @FormattedMessages(fixtures.messages.getNumber)
    getNumber() {
        return fixtures.values.getNumber;
    }

    @Get(fixtures.paths.getBoolean)
    @FormattedMessages(fixtures.messages.getBoolean)
    getBoolean(): boolean {
        return fixtures.values.getBoolean;
    }

    @Get(fixtures.paths.getArray)
    @FormattedMessages(fixtures.messages.getArray)
    getArray() {
        return fixtures.values.getArray;
    }

    @Get(fixtures.paths.getObject)
    @FormattedMessages(fixtures.messages.getObject)
    getObject() {
        return fixtures.values.getObject;
    }

    @Get(fixtures.paths.getEmpty)
    getEmpty() {
        return fixtures.values.getEmpty;
    }

    @Get(fixtures.paths.getHTTPException)
    getHTTPException() {
        throw FormattedMessages(fixtures.messages.getHTTPException, new HttpException(fixtures.values.getHTTPException, 403));
    }

    @Get(fixtures.paths.getNotHTTPException)
    getNotHTTPException() {
        throw new Error(fixtures.values.getNotHTTPException);
    }
}
