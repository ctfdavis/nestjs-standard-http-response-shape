import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ApplicationModule } from './src/app.module';
import { FormattedExceptionFilter, FormattedResponseInterceptor } from '../src';
import { runTests } from './test-runners';

describe('FormattedResponse interceptor + decorator on nest fastify', () => {
    let app: NestFastifyApplication;

    beforeEach(async () => {
        const adapter = new FastifyAdapter();
        const reflector = new Reflector();
        app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, adapter, { logger: false });
        const adapterHost = app.get(HttpAdapterHost);
        app.useGlobalInterceptors(new FormattedResponseInterceptor(reflector));
        app.useGlobalFilters(new FormattedExceptionFilter(adapterHost, reflector));
        await app.init();
        await app.getHttpAdapter().getInstance().ready();
    });

    runTests('fastify', () => app);
});
