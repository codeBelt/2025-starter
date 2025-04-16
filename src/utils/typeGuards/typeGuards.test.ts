import {describe, expect, test} from 'bun:test';
import {isDateObject, isDefined, isNumber, isObject, isRegex, isString} from './typeGuards';

const commonObjects = [{}, {prop: 'data'}, undefined, null, true, false, 0, 1, 'str', [], new Date(), /^fo(ba)?$/i];

describe('isDefined', () => {
  const cases = [
    {input: undefined, expected: false},
    {input: null, expected: false},
    {input: Number.NaN, expected: true},
    {input: 0, expected: true},
    {input: false, expected: true},
  ];

  for (const {input, expected} of cases) {
    test(`should return ${expected} for input ${String(input)}`, () => {
      expect(isDefined(input)).toBe(expected);
    });
  }
});

describe('isString', () => {
  test('should return true for a string', () => {
    expect(isString('str')).toBe(true);
  });

  test('should return false for non-string values', () => {
    const falseItems = commonObjects.filter((value) => typeof value !== 'string');

    for (const value of falseItems) {
      expect(isString(value)).toBe(false);
    }
  });
});

describe('isDateObject', () => {
  test('should return true for Date objects', () => {
    expect(isDateObject(new Date())).toBe(true);
  });

  test('should return false for non-Date objects', () => {
    const falseItems = commonObjects.filter((value) => !(value instanceof Date));

    for (const value of falseItems) {
      expect(isDateObject(value)).toBe(false);
    }
  });
});

describe('isRegex', () => {
  test('should return true for RegExp objects', () => {
    // biome-ignore lint/performance/useTopLevelRegex: Don't need to do for tests
    expect(isRegex(/^fo(ba)?$/i)).toBe(true);
  });

  test('should return false for non-RegExp objects', () => {
    const falseItems = commonObjects.filter((value) => !(value instanceof RegExp));

    for (const value of falseItems) {
      expect(isRegex(value)).toBe(false);
    }
  });
});

describe('isObject', () => {
  test('should return true for plain objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({prop: 'data'})).toBe(true);
  });

  test('should return false for non-object values', () => {
    const falseItems = commonObjects.filter(
      (value) =>
        value === undefined ||
        value === null ||
        typeof value !== 'object' ||
        Array.isArray(value) ||
        value instanceof Date ||
        value instanceof RegExp
    );

    for (const value of falseItems) {
      expect(isObject(value)).toBe(false);
    }
  });
});

describe('isNumber', () => {
  const cases = [
    {input: -1, expected: true},
    {input: 0, expected: true},
    {input: 1, expected: true},
    {input: Number.NaN, expected: false},
    {input: '', expected: false},
    {input: '1', expected: false},
    {input: null, expected: false},
    {input: undefined, expected: false},
    {input: true, expected: false},
  ];

  for (const {input, expected} of cases) {
    test(`should return ${expected} for input ${String(input)}`, () => {
      expect(isNumber(input)).toBe(expected);
    });
  }
});
