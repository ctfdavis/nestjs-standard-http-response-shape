export const fixtures = {
    messages: {
        getString: 'message for getString',
        getNumber: 'message for getNumber',
        getBoolean: ['message for getBoolean'],
        getArray: ['message for getArray', 'message for getArray'],
        getObject: [],
        getHTTPException: ['message for getHTTPException'],
        getBadRequestException: ['message for getBadRequestException']
    },
    expectedMessages: {
        getString: ['message for getString'],
        getNumber: ['message for getNumber'],
        getBoolean: ['message for getBoolean'],
        getArray: ['message for getArray', 'message for getArray'],
        getObject: [],
        getEmpty: [],
        getHTTPException: ['message for getHTTPException'],
        getNotHTTPException: ['not-http-exception'],
        getBadRequestException: ['message for getBadRequestException']
    },
    values: {
        getString: 'Hello world!',
        getNumber: 42,
        getBoolean: true,
        getArray: ['Hello', 'world'],
        getObject: { foo: 'bar' },
        getEmpty: undefined,
        getHTTPException: 'http-exception',
        getNotHTTPException: 'not-http-exception',
        getBadRequestException: {
            error: 'testing bad request'
        }
    },
    expectedValues: {
        getString: 'Hello world!',
        getNumber: 42,
        getBoolean: true,
        getArray: ['Hello', 'world'],
        getObject: { foo: 'bar' },
        getEmpty: null,
        getHTTPException: 'http-exception',
        getNotHTTPException: null,
        getBadRequestException: {
            error: 'testing bad request'
        }
    },
    paths: {
        getString: '/string',
        getNumber: '/number',
        getBoolean: '/boolean',
        getArray: '/array',
        getObject: '/object',
        getEmpty: '/empty',
        getHTTPException: '/http-exception',
        getNotHTTPException: '/not-http-exception',
        getBadRequestException: '/bad-request-exception'
    }
};
