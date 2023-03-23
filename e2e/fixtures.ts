export const fixtures = {
    messages: {
        getString: 'message for getString',
        getNumber: 'message for getNumber',
        getBoolean: ['message for getBoolean'],
        getArray: ['message for getArray', 'message for getArray'],
        getObject: [],
        getHTTPException: ['message for getHTTPException']
    },
    expectedMessages: {
        getString: ['message for getString'],
        getNumber: ['message for getNumber'],
        getBoolean: ['message for getBoolean'],
        getArray: ['message for getArray', 'message for getArray'],
        getObject: [],
        getEmpty: [],
        getHTTPException: ['message for getHTTPException'],
        getNotHTTPException: []
    },
    values: {
        getString: 'Hello world!',
        getNumber: 42,
        getBoolean: true,
        getArray: ['Hello', 'world'],
        getObject: { foo: 'bar' },
        getEmpty: undefined,
        getHTTPException: 'http-exception',
        getNotHTTPException: 'not-http-exception'
    },
    expectedValues: {
        getString: 'Hello world!',
        getNumber: 42,
        getBoolean: true,
        getArray: ['Hello', 'world'],
        getObject: { foo: 'bar' },
        getEmpty: null,
        getHTTPException: 'http-exception',
        getNotHTTPException: 'not-http-exception'
    },
    paths: {
        getString: '/string',
        getNumber: '/number',
        getBoolean: '/boolean',
        getArray: '/array',
        getObject: '/object',
        getEmpty: '/empty',
        getHTTPException: '/http-exception',
        getNotHTTPException: '/not-http-exception'
    }
};
