# NestJS Standard HTTP Response Shape

**nestjs-standard-http-response-shape** is an NPM package for NestJS applications that provides an HTTP response interceptor and exception filter for uniforming the response shape. A custom decorator `FormattedMessages` is also available for convenient setting of the `messages` property (see usages below).

This package is inspired by a blog post by Andrey Petrov titled ["How I Design JSON API Responses"](https://shazow.net/posts/how-i-design-json-api-responses/), which discusses the benefits of having a standard response shape for JSON APIs. By using **nestjs-standard-http-response-shape**, developers can utilize a standardized response shape in NestJS applications, leading to more consistent and predictable API behavior.

## Installation

You can install the package using NPM or Yarn:

```bash
# NPM
npm install nestjs-standard-http-response-shape

# Yarn
yarn add nestjs-standard-http-response-shape
```

## Usage

To use **nestjs-standard-http-response-shape** in your NestJS application, you need to register the `FormattedResponseInterceptor` and `FormattedExceptionFilter` providers in your application:

```typescript
// main.ts
import { Reflector } from '@nestjs/core';
// ...

const reflector = new Reflector();
app.useGlobalInterceptors(new FormattedResponseInterceptor(reflector));
app.useGlobalFilters(new FormattedExceptionFilter(reflector));
```

This will register the `FormattedResponseInterceptor` and `FormattedExceptionFilter` providers with the application, which will intercept all successful responses and format them into a standard shape, and also catch any exceptions and format them into a standard shape.

You can also use the `FormattedMessages` decorator to conveniently set the `messages` property for a particular route handler:

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

## Response Shape

The formatted response shape is defined by the following interfaces:

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

Successful responses will have a status of `Status.OK` and the payload will be included in the `payload` property. Error responses will have a status of `Status.ERROR` and an error message will be included in the `messages` property.

## Platforms

**nestjs-standard-http-response-shape** supports both the Express and Fastify platforms.

## Testing

The package is thoroughly tested with both unit tests and end-to-end tests to ensure reliable behavior.