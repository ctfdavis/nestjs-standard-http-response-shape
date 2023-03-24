# NestJS Standard HTTP Response Shape

A package for nest.js applications that provides an HTTP response interceptor and exception filter for uniforming the response shape.

This package is heavily inspired by a blog post by Andrey Petrov titled ["How I Design JSON API Responses"](https://shazow.net/posts/how-i-design-json-api-responses/), which discusses the benefits of having a standard response shape for JSON APIs. By using **nestjs-standard-http-response-shape**, developers can utilize a standardized response shape in nest.js applications, leading to more consistent and predictable API behavior.

## Installation

```bash
# npm
npm install nestjs-standard-http-response-shape

# yarn
yarn add nestjs-standard-http-response-shape

# pnpm
pnpm add nestjs-standard-http-response-shape
```

## Usage

To use this package in your NestJS application, simply register the `FormattedResponseInterceptor` and `FormattedExceptionFilter` providers in your application:

```typescript
// main.ts
import { Reflector } from '@nestjs/core';
import { FormattedResponseInterceptor, FormattedExceptionFilter } from 'nestjs-standard-http-response-shape';
// ...

const reflector = new Reflector();
const adapterHost = app.get(HttpAdapterHost);
app.useGlobalInterceptors(new FormattedResponseInterceptor(reflector));
app.useGlobalFilters(new FormattedExceptionFilter(adapterHost, reflector));
```

The providers will intercept all successful responses and catch exceptions, and then format them into a standard shape.

You can use the `FormattedMessages` function to conveniently set the `messages` property for a particular route handler or to add formatted messages to an exception:

```typescript
import { Controller, Get, HttpException } from '@nestjs/common';
import { FormattedMessages } from 'nestjs-standard-http-response-shape';

@Controller()
export class AppController {
  @Get()
  @FormattedMessages(['Hello, world!'])
  getHello() {
    return { message: 'Hello, world!' };
  }

  @Get('error')
  getError() {
    throw FormattedMessages(['An error occurred.'], new HttpException('An error occurred.', 500));
  }
}
```

In this example, the `FormattedMessages` function is used in two ways:

1. As a decorator for the `getHello` route handler, it sets the messages property with the given array of messages. In this case, it sets the messages property to `['Hello, world!']`.
2. For the `getError` route handler, it is used differently. Instead of being a decorator, the `FormattedMessages` function is called directly with two arguments: an array of messages and an instance of `HttpException`. The function then adds the formatted messages to the exception by setting the metadata on a new instance of the exception. This new instance is then thrown in the getError route handler. In this case, the formatted messages are `['An error occurred.']`.

### Response Shape

The formatted response shape is defined by the following types:

```typescript
enum Status {
    OK = 'ok',
    ERROR = 'error'
}

type NotUndefined = {} | null;

interface Formatted<T extends NotUndefined = NotUndefined> {
    status: Status;
    messages: string[];
    payload: T;
    code: number;
}

interface FormattedResponse<T extends NotUndefined> extends Formatted<T> {
    status: Status.OK;
}

interface FormattedException extends Formatted {
    status: Status.ERROR;
}
```

### Examples

Successful responses will have a status of `Status.OK` and the payload will be included in the `payload` property. Error responses will have a status of `Status.ERROR` and any error messages will be included in the `messages` property.

#### Successful Response

```typescript
// app.controller.ts
@Get('/hello')
@FormattedMessages(['This is a message.'])
// A string is also accepted:
// @FormattedMessages('This is a message.')
getHello() {
    return { message: 'Hello, world!' };
}
```

```JSON
# GET /hello
{
    "status": "ok",
    "messages": [
        "This is a message."
    ],
    "payload": {
        "message": "Hello, world!"
    },
    "code": 200
}
```

#### Error Response

```typescript
// app.controller.ts
@Get('/error')
getError() {
    throw FormattedMessages(
        ['An error occurred.'],
        new BadRequestException({ error: 'Error goes here.' }),
    );
    // alternatively, use HttpException:
    // throw FormattedMessages(['An error occurred.'], new HttpException({ error: 'Error goes here.' }, 500));
}
```

```json
# GET /error
{
    "status": "error",
    "messages": [
        "An error occurred."
    ],
    "payload": {
        "error": "Error goes here."
    },
    "code": 500
}
```

##### Differentiation between `payload` and `messages`

As for error responses, the purpose of the payload field in error responses is to provide additional, structured information about the error, whereas `messages` is for human-readable error messages

Therefore, this library will not automatically add any error message to the `messages` property. Instead, the developer must explicitly add the error message to the `messages` property using the `FormattedMessages` function.

For example, the following code will not add the error message to the `messages` property:

```typescript
// app.controller.ts
@Get('/error')
getError() {
    throw new BadRequestException('error string');
}
```

```json
# GET /error
{
    "status": "error",
    "messages": [],
    "payload": {
      "statusCode": 400,
      "message": "error string",
      "error": "Bad Request"
    },
    "code": 400
}
```

As seen above, the library will add the string to the `message` property of the `payload` object. To add the error message to the `messages` property, the developer must explicitly add the error message to the `messages` property.

## Platforms

**nestjs-standard-http-response-shape** supports both the Express and Fastify platforms.

## Testing

The package is tested with both unit tests (`/test`) and e2e tests (`/e2e`).