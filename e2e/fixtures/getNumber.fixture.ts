export const getNumberFixture = {
    path: '/number',
    statusCode: 200,
    expected: {
        status: 'ok',
        messages: ['message for getNumber'],
        payload: 42,
        code: 200
    }
};
