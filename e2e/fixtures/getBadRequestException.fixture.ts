export const getBadRequestExceptionFixture = {
    path: '/bad-request-exception',
    statusCode: 400,
    expected: {
        status: 'error',
        messages: ['message for getBadRequestException'],
        payload: {
            error: 'testing bad request'
        },
        code: 400
    }
};
