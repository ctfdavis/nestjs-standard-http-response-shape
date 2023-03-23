# NestJS Standard HTTP Response Shape

A package for nest.js applications that provides an HTTP response interceptor and exception filter for uniforming the response shape.

This package is heavily inspired by a blog post by Andrey Petrov titled ["How I Design JSON API Responses"](https://shazow.net/posts/how-i-design-json-api-responses/), which discusses the benefits of having a standard response shape for JSON APIs. By using **nestjs-standard-http-response-shape**, developers can utilize a standardized response shape in nest.js applications, leading to more consistent and predictable API behavior.

## Installation

You can install the package using NPM or Yarn:

```bash
# NPM
npm install nestjs-standard-http-response-shape

# Yarn
yarn add nestjs-standard-http-response-shape
```

## Usage

To use this package in your NestJS application, simply register the `FormattedResponseInterceptor` and `FormattedExceptionFilter` providers in your application:

```typescript
// main.ts
import { Reflector } from '@nestjs/core';
import { FormattedResponseInterceptor, FormattedExceptionFilter } from 'nestjs-standard-http-response-shape';
// ...

const reflector = new Reflector();
app.useGlobalInterceptors(new FormattedResponseInterceptor(reflector));
app.useGlobalFilters(new FormattedExceptionFilter(reflector));
```

The providers will intercept all successful responses and catch exceptions, and then format them into a standard shape.

You can then use the `FormattedMessages` decorator to conveniently set the `messages` property for a particular route handler:

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

In this example, the `FormattedMessages` decorator is used to set the `messages` property for the `getHello` and `getError` route handlers.

### Response Shape

The formatted response shape is defined by the following types:

```typescript
enum Status {
    OK = 'ok',
    ERROR = 'error'
}

interface Formatted<T> {
    status: Status;
    messages: string[];
    payload: T | null;
    code: number;
}

interface FormattedResponse<T> extends Formatted<T> {
    status: Status.OK;
    payload: T | null;
}

interface FormattedException<T> extends Formatted<T> {
    status: Status.ERROR;
}
```

### Examples

#### Successful Response

```typescript
// app.controller.ts
@Get('/hello')
@FormattedMessages(['This is a message.'])
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
    throw FormattedMessages(['An error occurred.'], new HttpException({ error: 'Error goes here.' }, 500));
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

Successful responses will have a status of `Status.OK` and the payload will be included in the `payload` property. Error responses will have a status of `Status.ERROR` and any error messages will be included in the `messages` property.

## Platforms

**nestjs-standard-http-response-shape** supports both the Express and Fastify platforms.

## Testing

The package is tested with both unit tests (`/test`) and e2e tests (`/e2e`).