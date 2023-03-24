export const getNotHTTPExceptionFixture = {
    path: '/not-http-exception',
    statusCode: 500,
    expected: {
        status: 'error',
        messages: [],
        payload: { message: 'something went wrong' },
        code: 500
    }
};
