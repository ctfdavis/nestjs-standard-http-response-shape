import * as request from 'supertest';
import { fixtures } from './fixtures';

export function runTests(platform: string, getApp: () => any) {
    describe(`Response interceptor + decorator on nest ${platform}`, () => {
        it('should return string', () => {
            return request(getApp().getHttpServer()).get(fixtures.paths.getString).expect(200).expect({
                status: 'ok',
                code: 200,
                messages: fixtures.expectedMessages.getString,
                payload: fixtures.expectedValues.getString
            });
        });

        it('should return number', () => {
            return request(getApp().getHttpServer()).get(fixtures.paths.getNumber).expect(200).expect({
                status: 'ok',
                code: 200,
                messages: fixtures.expectedMessages.getNumber,
                payload: fixtures.expectedValues.getNumber
            });
        });

        it('should return boolean', () => {
            return request(getApp().getHttpServer()).get(fixtures.paths.getBoolean).expect(200).expect({
                status: 'ok',
                code: 200,
                messages: fixtures.expectedMessages.getBoolean,
                payload: fixtures.expectedValues.getBoolean
            });
        });

        it('should return array', () => {
            return request(getApp().getHttpServer()).get(fixtures.paths.getArray).expect(200).expect({
                status: 'ok',
                code: 200,
                messages: fixtures.expectedMessages.getArray,
                payload: fixtures.expectedValues.getArray
            });
        });

        it('should return object', () => {
            return request(getApp().getHttpServer()).get(fixtures.paths.getObject).expect(200).expect({
                status: 'ok',
                code: 200,
                messages: fixtures.expectedMessages.getObject,
                payload: fixtures.values.getObject
            });
        });

        it('should return empty', () => {
            return request(getApp().getHttpServer()).get(fixtures.paths.getEmpty).expect(200).expect({
                status: 'ok',
                code: 200,
                messages: fixtures.expectedMessages.getEmpty,
                payload: fixtures.expectedValues.getEmpty
            });
        });

        it('should return HTTP exception', () => {
            return request(getApp().getHttpServer()).get(fixtures.paths.getHTTPException).expect(403).expect({
                status: 'error',
                code: 403,
                messages: fixtures.expectedMessages.getHTTPException,
                payload: fixtures.expectedValues.getHTTPException
            });
        });

        it('should return not HTTP exception', () => {
            return request(getApp().getHttpServer()).get(fixtures.paths.getNotHTTPException).expect(500).expect({
                status: 'error',
                code: 500,
                messages: fixtures.expectedMessages.getNotHTTPException,
                payload: fixtures.expectedValues.getNotHTTPException
            });
        });
    });
}
