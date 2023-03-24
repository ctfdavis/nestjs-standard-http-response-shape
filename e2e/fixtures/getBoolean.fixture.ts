export const getBooleanFixture = {
    path: '/boolean',
    statusCode: 200,
    expected: {
        status: 'ok',
        messages: ['message for getBoolean'],
        payload: true,
        code: 200
    }
};
