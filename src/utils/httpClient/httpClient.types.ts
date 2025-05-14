import type {ZodType} from 'zod';

/**
 * Options for configuring an HTTP client request.
 */
export type HttpClientOptionsType<T = Record<string, unknown>> = {
  /**
   * The body of the request. This can be a string or an object representing the data.
   *
   * @example
   * const options: HttpClientOptionsType = {
   *   body: { key: 'value' },
   * };
   */
  body?: T;

  /**
   * Custom headers to include in the request.
   *
   * @example
   * const options: HttpClientOptionsType = {
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': 'Bearer token',
   *   },
   * };
   */
  headers?: Record<string, string>;

  /**
   * URL parameters to include in the request.
   *
   * @example
   * const options: HttpClientOptionsType = {
   *   params: {
   *     search: 'query',
   *     page: '1',
   *   },
   * };
   */
  params?: T;

  schema?: ZodType;
};
