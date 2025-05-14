import axios, {type Method} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {logResponseZodErrors} from '../logger.utils';
import type {ServiceResponseType} from '../response/response.types';
import {
  buildServiceResponseFailure,
  buildServiceResponseSuccess,
  isSuccessfulHttpStatusCode,
} from '../response/response.utils';
import type {HttpClientOptionsType} from './httpClient.types';

/**
 * Generic function to make requests.
 *
 * @param method         The HTTP method for the request (e.g., GET, POST, PUT, DELETE).
 * @param url            The URL for the API, which can be relative or absolute.
 * @param config         Optional Axios configuration to further customize the request (e.g., headers, timeout).
 */
const httpClient = async <T, P = Record<string, unknown>>(
  method: Method,
  url: string,
  config?: HttpClientOptionsType<P>
): Promise<ServiceResponseType<T>> => {
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    ...config?.headers,
  };

  return loadWithFetch<T, P>(method, url, {
    ...config,
    headers,
  });
};

export const http = {
  /**
   * This function performs a GET request, used to retrieve resources.
   *
   * @xample
   * ```
   * const response = await http.get('/users', { page: 1, limit: 10 });
   * console.log(response.data);
   * ```
   * @param url        The URL for the API, which can be relative or absolute.
   * @param config     Optional Axios configuration to further customize the request.
   */
  get: async <T, P extends Record<string, unknown> = Record<string, unknown>>(
    url: string,
    config?: HttpClientOptionsType<P>
  ): Promise<ServiceResponseType<T>> => httpClient<T, P>('get', url, config),

  /**
   * Make a PUT request.
   *
   * @xample
   * ```
   * const data = { name: 'John Doe' };
   * const response = await http.put('/users/123', data);
   * console.log(response.data);
   * ```
   * @param url        The URL for the API, which can be relative or absolute.
   * @param config     Optional Axios configuration to further customize the request.
   */
  put: async <T, D extends Record<string, unknown> = Record<string, unknown>>(
    url: string,
    config?: HttpClientOptionsType<D>
  ): Promise<ServiceResponseType<T>> => httpClient<T, D>('put', url, config),

  /**
   * This function performs a PATCH request, used to partially update a resource.
   *
   * @xample
   * ```
   * const data = { status: 'active' };
   * const response = await http.patch('/users/123', data);
   * console.log(response.data);
   * ```
   * @param url        The URL for the API, which can be relative or absolute.
   * @param config     Optional Axios configuration to further customize the request.
   */
  patch: async <T, D extends Record<string, unknown> = Record<string, unknown>>(
    url: string,
    config?: HttpClientOptionsType<D>
  ): Promise<ServiceResponseType<T>> => httpClient<T, D>('patch', url, config),

  /**
   * This function performs a POST request, used to create new resources.
   *
   * @xample
   * ```
   * const data = { name: 'Jane Doe', email: 'jane.doe@example.com' };
   * const response = await http.post('/users', data);
   * console.log(response.data);
   * ```
   * @param url        The URL for the API, which can be relative or absolute.
   * @param config     Optional Axios configuration to further customize the request.
   */
  post: async <T, D extends Record<string, unknown> = Record<string, unknown>>(
    url: string,
    config?: HttpClientOptionsType<D>
  ): Promise<ServiceResponseType<T>> => httpClient<T, D>('post', url, config),

  /**
   * This function performs a DELETE request to remove a resource.
   *
   * @xample
   * ```
   * const response = await http.delete('/users/123');
   * console.log(response.data);
   * ```
   * @param url        The URL for the API, which can be relative or absolute.
   * @param config     Optional Axios configuration to further customize the request.
   */
  delete: async <T = void>(
    url: string,
    config?: Omit<HttpClientOptionsType, 'body' | 'params'>
  ): Promise<ServiceResponseType<T>> => httpClient<T>('delete', url, config),
};

export const loadWithFetch = async <T, P = Record<string, unknown>>(
  method: Method,
  url: string,
  config: HttpClientOptionsType<P>
): Promise<ServiceResponseType<T>> => {
  const urlParams: string = config.params
    ? `?${new URLSearchParams(config.params).toString()}`
    : '';

  try {
    const response = await fetch(url + urlParams, {
      method: method.toUpperCase(),
      headers: config.headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
      cache: 'no-cache',
    });

    if (!isSuccessfulHttpStatusCode(response.status)) {
      const errorMessage = `🚨 loadWithFetch Error: ${[response.statusText, response.status].join(' | ')}`;

      console.error(errorMessage, {url});

      return buildServiceResponseFailure(response.statusText, response.status);
    }

    // todo: handle other responses then json.
    let responseData: T = await response.json();

    if (config?.schema) {
      const parsedData = config.schema.safeParse(responseData);

      if (!parsedData.success) {
        logResponseZodErrors<T>(parsedData.error, {url, data: responseData});
      } else {
        responseData = parsedData.data;
      }
    }

    return buildServiceResponseSuccess(responseData, response.status);
  } catch (error) {
    return buildServiceResponseFailure(error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const loadWithAxios = async <T, P = Record<string, unknown>>(
  method: Method,
  url: string,
  config?: HttpClientOptionsType<P>
): Promise<ServiceResponseType<T>> => {
  try {
    const response = await axios({
      ...config,
      method,
      url,
      data: config?.body,
    });

    let responseData: T = response.data;

    if (config?.schema) {
      const parsedData = config.schema.safeParse(responseData);

      if (!parsedData.success) {
        logResponseZodErrors<T>(parsedData.error, {url, data: responseData});
      } else {
        responseData = parsedData.data;
      }
    }

    return buildServiceResponseSuccess(responseData, response.status);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // https://axios-http.com/docs/handling_errors

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return buildServiceResponseFailure(error.response.statusText, error.response.status);
      }

      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return buildServiceResponseFailure(error.request);
    }

    // Something happened in setting up the request that triggered an Error
    return buildServiceResponseFailure(error);
  }
};
