export const getStringFixture = {
    path: '/string',
    statusCode: 200,
    expected: {
        status: 'ok',
        messages: ['message for getString'],
        payload: 'Hello world!',
        code: 200
    }
};
