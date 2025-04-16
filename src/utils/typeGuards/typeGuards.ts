
/**
 * Type Guard for checking defined values.
 *
 * This function determines whether a given value is neither `null` nor `undefined`.
 * It narrows the type of the value to exclude these types, effectively allowing
 * the caller to treat the value as defined.
 *
 * @example
 * const myValue = getValue();
 * if (isDefined(myValue))
 *   // myValue is now treated as type T
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

/**
 * Type Guard for checking if a value is a string.
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Type Guard for checking if a value is a number.
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Type Guard for checking if a value is a regular expression.
 */
export const isRegex = (value: unknown): value is RegExp => {
  return value instanceof RegExp;
};

/**
 * Type Guard for checking if a value is a Date object.
 */
export const isDateObject = (value: unknown): value is Date => {
  return value instanceof Date;
};

/**
 * Type Guard for checking if a value is a plain object.
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    typeof value === 'object' &&
    !isRegex(value) &&
    !isDateObject(value)
  );
};

