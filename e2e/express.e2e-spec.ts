import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationModule } from './src/app.module';
import { FormattedExceptionFilter, FormattedResponseInterceptor } from '../src';
import { runTests } from './test-runners';

describe('FormattedResponse interceptor + decorator on nest express', () => {
    let app: NestExpressApplication;

    beforeEach(async () => {
        const express = require('express');
        const server = express();
        const adapter = new ExpressAdapter(server);
        const reflector = new Reflector();
        app = await NestFactory.create<NestExpressApplication>(ApplicationModule, adapter, { logger: false });
        app.useGlobalInterceptors(new FormattedResponseInterceptor(reflector));
        app.useGlobalFilters(new FormattedExceptionFilter(reflector));
        await app.init();
    });

    runTests('express', () => app);
});
