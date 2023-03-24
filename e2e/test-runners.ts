import * as request from 'supertest';
import {
    getArrayFixture,
    getBadRequestExceptionFixture,
    getBooleanFixture,
    getEmptyFixture,
    getHTTPExceptionFixture,
    getNotHTTPExceptionFixture,
    getNumberFixture,
    getObjectFixture,
    getStringFixture
} from './fixtures';

export function runTests(platform: string, getApp: () => any) {
    describe(`Response interceptor + decorator on nest ${platform}`, () => {
        it('should return string', () => {
            return request(getApp().getHttpServer()).get(getStringFixture.path).expect(getStringFixture.statusCode).expect(getStringFixture.expected);
        });

        it('should return number', () => {
            return request(getApp().getHttpServer()).get(getNumberFixture.path).expect(getNumberFixture.statusCode).expect(getNumberFixture.expected);
        });

        it('should return boolean', () => {
            return request(getApp().getHttpServer()).get(getBooleanFixture.path).expect(getBooleanFixture.statusCode).expect(getBooleanFixture.expected);
        });

        it('should return array', () => {
            return request(getApp().getHttpServer()).get(getArrayFixture.path).expect(getArrayFixture.statusCode).expect(getArrayFixture.expected);
        });

        it('should return object', () => {
            return request(getApp().getHttpServer()).get(getObjectFixture.path).expect(getObjectFixture.statusCode).expect(getObjectFixture.expected);
        });

        it('should return empty', () => {
            return request(getApp().getHttpServer()).get(getEmptyFixture.path).expect(getEmptyFixture.statusCode).expect(getEmptyFixture.expected);
        });

        it('should return HTTP exception', () => {
            return request(getApp().getHttpServer()).get(getHTTPExceptionFixture.path).expect(getHTTPExceptionFixture.statusCode).expect(getHTTPExceptionFixture.expected);
        });

        it('should return not HTTP exception', () => {
            return request(getApp().getHttpServer()).get(getNotHTTPExceptionFixture.path).expect(getNotHTTPExceptionFixture.statusCode).expect(getNotHTTPExceptionFixture.expected);
        });

        it('should return bad request exception', () => {
            return request(getApp().getHttpServer()).get(getBadRequestExceptionFixture.path).expect(getBadRequestExceptionFixture.statusCode).expect(getBadRequestExceptionFixture.expected);
        });
    });
}
