export const getNotHTTPExceptionFixture = {
    path: '/not-http-exception',
    statusCode: 500,
    expected: {
        status: 'error',
        messages: ['message for getNotHTTPException'],
        payload: null,
        code: 500
    }
};
