export const getArrayFixture = {
    path: '/array',
    statusCode: 200,
    expected: {
        status: 'ok',
        messages: ['message for getArray', 'message for getArray'],
        payload: ['Hello', 'world'],
        code: 200
    }
};
