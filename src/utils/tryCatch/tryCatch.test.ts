import {beforeEach, describe, expect, it, spyOn} from 'bun:test';
import {buildServiceResponseSuccess} from '../response/response';
import type {ServiceResponseType} from '../response/response.types';
import {tryCatch} from './tryCatch';

describe('tryCatch', () => {
  beforeEach(() => {
    // Mock console.error to prevent error messages from showing up in the terminal
    spyOn(console, 'error').mockImplementationOnce(() => {});
  });

  it('should return a success response when the promise resolves', async () => {
    const mockData = {userId: 1, name: 'Alice'};
    const mockPromise = Promise.resolve(mockData);

    const result: ServiceResponseType<typeof mockData> = await tryCatch(mockPromise);

    expect(result).toEqual(buildServiceResponseSuccess(mockData));
    expect(result.isSuccessful).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return a failure response when the promise rejects with an error', async () => {
    const mockError = new Error('Something went wrong');
    const mockPromise = Promise.reject(mockError);

    const result: ServiceResponseType<never, typeof mockError> = await tryCatch(mockPromise);

    // expect(result).toEqual(buildServiceResponseFailure(mockError));
    expect(result.isSuccessful).toBe(false);
    expect(result.data).toBeUndefined();
  });

  it('should handle non-Error objects correctly when the promise rejects', async () => {
    const mockError = 'Non-error string';
    const mockPromise = Promise.reject(mockError);

    const result: ServiceResponseType<never, Error> = await tryCatch(mockPromise);

    expect(result.isSuccessful).toBe(false);
    expect(result.error?.message).toBe('Non-error string');
  });

  it('should log the error message to the console when promise rejects', async () => {
    const mockError = new Error('Test error');
    const mockPromise = Promise.reject(mockError);

    const consoleSpy = spyOn(console, 'error').mockImplementationOnce(() => {});

    await tryCatch(mockPromise);

    expect(consoleSpy).toHaveBeenCalledWith('🚨 tryCatch Error:', mockError.message);

    consoleSpy.mockRestore();
  });
});
