import {buildServiceResponseFailure, buildServiceResponseSuccess, buildTypeSafeError} from '../response/response';
import type {SerializableErrorType, ServiceResponseType} from '../response/response.types';

/**
 * A utility function that wraps a promise in a try-catch block.
 * This function is useful when you need to handle both success and failure responses
 * and ensure that they follow the {@link ServiceResponseType} pattern.
 *
 * If the promise resolves successfully, the returned object will contain:
 * - `data`: the resolved value from the promise
 * - `isSuccessful`: true
 *
 * If the promise is rejected, the returned object will contain:
 * - `error`: the caught error (an instance of `Error`)
 * - `isSuccessful`: false
 *
 * @example
 * ```
 *    const {data, error} = await tryCatch(fetchDataFromApi());
 *    if (data) {
 *      console.log(data);  // handle successful data
 *    } else {
 *      console.error(error.message);  // handle error case
 *    }
 * ```
 */
export const tryCatch = async <E extends SerializableErrorType, T>(
  promise: Promise<T>
): Promise<ServiceResponseType<T, E>> => {
  // If this code has issues, We could try promise.then().catch() like: https://github.com/ts-zen/trycatch/blob/main/src/trycatch.ts#L80-L100
  try {
    const data = await promise;

    return buildServiceResponseSuccess(data);
  } catch (catchError) {
    const error = buildTypeSafeError<E>(catchError);

    console.error('🚨 tryCatch Error:', error.message);

    return buildServiceResponseFailure<E>(error);
  }
};
