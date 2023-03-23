import 'reflect-metadata';
import { FormattedMessages } from '../src';
import { FORMATTED_MESSAGE_METADATA } from '../src/constants';

describe('FormattedMessages', () => {
    const testCases = [
        {
            title: 'single string message',
            messages: 'Test message',
            expectedResult: ['Test message']
        },
        {
            title: 'array of messages',
            messages: ['Test message 1', 'Test message 2'],
            expectedResult: ['Test message 1', 'Test message 2']
        }
    ];

    for (const { title, messages, expectedResult } of testCases) {
        describe(title, () => {
            it('should set metadata on a method with the given messages', () => {
                // Arrange
                class TestClass {
                    @FormattedMessages(messages)
                    testMethod() {
                        // ...
                    }
                }
                // Act
                const actual = Reflect.getMetadata(FORMATTED_MESSAGE_METADATA, TestClass.prototype.testMethod);
                // Assert
                expect(actual).toEqual(expectedResult);
            });

            it('should set metadata on a class constructor with the given messages', () => {
                // Arrange
                class TestClass {}
                FormattedMessages(messages)(TestClass);
                // Act
                const actual = Reflect.getMetadata(FORMATTED_MESSAGE_METADATA, TestClass);
                // Assert
                expect(actual).toEqual(expectedResult);
            });
        });
    }
});
