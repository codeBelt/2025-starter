export interface ServiceResponseSuccessType<T> {
  data: T;
  error?: never;
  isSuccessful: true;
  statusCode?: number;
}
export interface ServiceResponseFailureType<E = SerializableErrorType> {
  data?: never;
  error: E;
  isSuccessful: false;
  statusCode?: number;
}

export type ServiceResponseType<T, E = SerializableErrorType> =
  | ServiceResponseSuccessType<T>
  | ServiceResponseFailureType<E>;

/**
 * A plain error object used to avoid issues with non-serializable error types,
 * which cannot be passed between server actions and client in Next.js.
 *
 * This ensures that only plain objects (not Error instances) are sent to the client.
 */
export type SerializableErrorType = {
  message: string;
};
