export const getObjectFixture = {
    path: '/object',
    statusCode: 200,
    expected: {
        status: 'ok',
        messages: [],
        payload: {
            foo: 'bar'
        },
        code: 200
    }
};
