import {StatusCodes} from 'http-status-codes';
import {isObject} from '../typeGuards/typeGuards';
import type {
  SerializableErrorType,
  ServiceResponseFailureType,
  ServiceResponseSuccessType,
  ServiceResponseType,
} from './response.types';

/**
 * Constructs a standard Error object from the provided error input.
 * If the input is already an instance of Error, it returns it as is.
 * Otherwise, it converts the input to a string and creates a new Error.
 *
 * @example
 * const err1 = buildTypeSafeError(new Error('An error occurred.'));
 * console.log(err1.message); // 'An error occurred.'
 *
 * const err2 = buildTypeSafeError('Some other error message');
 * console.log(err2.message); // 'Some other error message'
 */
export function buildTypeSafeError<E extends SerializableErrorType>(error: unknown): E {
  const result = error instanceof Error || isObject(error) ? error : new Error(String(error));

  return {message: result.message} as E;
}

/**
 * Constructs a standardized response object for a successful operation.
 * This function is useful when you need to handle success cases consistently and
 * ensure that both success and failure responses follow the {@link ServiceResponseType} pattern.
 *
 * @example
 * ```
 *    const response = buildServiceResponseSuccess({userId: 123, name: 'Alice'});
 *    console.log(response.data); // {userId: 123, name: 'Alice'}
 *    console.log(response.isSuccessful); // true
 * ```
 */
export function buildServiceResponseSuccess<T>(
  data: T,
  statusCode: StatusCodes = StatusCodes.OK
): ServiceResponseSuccessType<T> {
  return {
    data,
    isSuccessful: true,
    statusCode,
  };
}

/**
 * Constructs a standardized response object for an unsuccessful operation.
 * This function is useful when you need to handle failure cases consistently and
 * ensure that both success and failure responses follow the {@link ServiceResponseType} pattern.
 *
 * @example
 * ```
 *    const {data, error} = someCondition
 *      ? await someAsyncFunction()
 *      : buildServiceResponseFailure('Some condition was not met');
 *    console.log(error.message); // 'Some condition was not met'
 *    console.log(isSuccessful); // false
 * ```
 */
export function buildServiceResponseFailure<E extends SerializableErrorType>(
  message: unknown | string | E,
  statusCode?: StatusCodes
): ServiceResponseFailureType<E> {
  return {
    error: buildTypeSafeError(message),
    isSuccessful: false,
    statusCode,
  };
}

/**
 * Handles multiple response objects, filters out the successful ones,
 * and combines the error messages from the failed ones into one.
 *
 * @param responses A list of response objects that may contain success or failure.
 */
export function buildServiceResponseFailures(...responses: ServiceResponseType<unknown>[]): ServiceResponseFailureType {
  const combinedErrorMessages = responses
    .filter((response) => !response.isSuccessful)
    .map((response) => response.error.message)
    .join(' | ');

  return buildServiceResponseFailure(`Multiple Errors: ${combinedErrorMessages}`);
}

/**
 * Checks if the provided HTTP status code indicates a successful response.
 * A successful status code is defined as being in the range of 200 (inclusive)
 * to 300 (exclusive).
 *
 * @example
 * isSuccessfulHttpStatusCode(200); // returns true
 * isSuccessfulHttpStatusCode(300); // returns false
 */
export function isSuccessfulHttpStatusCode(statusCode: StatusCodes | undefined | null): boolean {
  if (!statusCode) {
    return false;
  }

  return statusCode >= StatusCodes.OK && statusCode < StatusCodes.MULTIPLE_CHOICES;
}
