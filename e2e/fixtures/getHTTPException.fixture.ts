export const getHTTPExceptionFixture = {
    path: '/http-exception',
    statusCode: 403,
    expected: {
        status: 'error',
        messages: ['message for getHTTPException'],
        payload: 'http exception',
        code: 403
    }
};
