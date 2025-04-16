import {describe, expect, it, test} from 'bun:test';
import {StatusCodes} from 'http-status-codes';
import {
  buildServiceResponseFailure,
  buildServiceResponseFailures,
  buildServiceResponseSuccess,
  buildTypeSafeError,
  isSuccessfulHttpStatusCode,
} from './response';
import type {ServiceResponseType} from './response.types';

describe('buildTypeSafeError', () => {
  test.each([
    {input: 'Some string error', expectedMessage: 'Some string error'},
    {input: 404, expectedMessage: '404'},
    {input: null, expectedMessage: 'null'},
    {input: undefined, expectedMessage: 'undefined'},
    {input: {message: 'An object error'}, expectedMessage: 'An object error'},
  ])('should return an Error object with the correct message for input: $input', ({input, expectedMessage}) => {
    const result = buildTypeSafeError(input);

    expect(result).not.toBeInstanceOf(Error);
    expect(result.message).toBe(expectedMessage);
  });

  it('should return the same Error object if already passed an Error instance', () => {
    const input = new Error('Existing error');
    const result = buildTypeSafeError(input);

    expect(result).not.toBe(input);
    expect(result.message).toBe('Existing error');
  });
});

describe('buildServiceResponseFailure', () => {
  it('should return a failure response with the correct message and status code', () => {
    const result = buildServiceResponseFailure('Failure message', 400);

    expect(result).toHaveProperty('error');
    expect(result.error.message).toBe('Failure message');
    expect(result.isSuccessful).toBe(false);
    expect(result.statusCode).toBe(400);
  });

  it('should handle an Error object as the message', () => {
    const error = new Error('Some error occurred');
    const result = buildServiceResponseFailure(error, 500);

    expect(result).toHaveProperty('error');
    expect(result.error).not.toBe(error);
    expect(result.error.message).toBe('Some error occurred');
    expect(result.isSuccessful).toBe(false);
    expect(result.statusCode).toBe(500);
  });
});

describe('buildServiceResponseSuccess', () => {
  it('should return a success response with the correct data and status code', () => {
    const data = {userId: 1, name: 'Alice'};
    const result = buildServiceResponseSuccess(data, StatusCodes.OK);

    expect(result).toHaveProperty('data');
    expect(result.data).toEqual(data);
    expect(result.isSuccessful).toBe(true);
    expect(result.statusCode).toBe(200);
  });

  it('should return a success response without status code', () => {
    const data = {userId: 2, name: 'Bob'};
    const result = buildServiceResponseSuccess(data);

    expect(result).toHaveProperty('data');
    expect(result.data).toEqual(data);
    expect(result.isSuccessful).toBe(true);
    expect(result.statusCode).toBe(StatusCodes.OK);
  });
});

describe('buildServiceResponseFailures', () => {
  it('should return an error response with isSuccessful false when all responses are successful', () => {
    const responses: ServiceResponseType<unknown>[] = [
      {isSuccessful: true, data: 'data1'},
      {isSuccessful: true, data: 'data2'},
    ];

    expect(buildServiceResponseFailures(...responses)).toEqual({
      error: {message: 'Multiple Errors: '},
      isSuccessful: false,
      statusCode: undefined,
    });
  });

  it('should combine error messages when some responses fail', () => {
    const responses: ServiceResponseType<unknown>[] = [
      {isSuccessful: false, error: {message: 'Customer Error 1'}},
      {isSuccessful: true, data: 'data2'},
      {isSuccessful: false, error: {message: 'Customer Error 2'}},
    ];

    expect(buildServiceResponseFailures(...responses)).toEqual({
      error: {message: 'Multiple Errors: Customer Error 1 | Customer Error 2'},
      isSuccessful: false,
      statusCode: undefined,
    });
  });

  it('should return an error response when no responses are passed', () => {
    expect(buildServiceResponseFailures()).toEqual({
      error: {message: 'Multiple Errors: '},
      isSuccessful: false,
      statusCode: undefined,
    });
  });
});

describe('isSuccessfulHttpStatusCode', () => {
  test.each([
    {input: undefined, expected: false},
    {input: null, expected: false},
    {input: 199, expected: false},
    {input: 200, expected: true},
    {input: 299, expected: true},
    {input: 300, expected: false},
    {input: 400, expected: false},
  ])('should return $expected for input $input', ({input, expected}) => {
    expect(isSuccessfulHttpStatusCode(input)).toBe(expected);
  });
});
