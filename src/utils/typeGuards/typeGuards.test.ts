import {describe, expect, it, test} from 'bun:test';
import {isDateObject, isDefined, isNumber, isObject, isRegex, isString} from './typeGuards';

const commonObjects = [{}, {prop: 'data'}, undefined, null, true, false, 0, 1, 'str', [], new Date(), /^fo(ba)?$/i];

describe('isDefined', () => {
  test.each`
    input         | expected
    ${undefined}  | ${false}
    ${null}       | ${false}
    ${Number.NaN} | ${true}
    ${0}          | ${true}
    ${false}      | ${true}
  `('should return $expected for input $input', ({input, expected}) => {
    expect(isDefined(input)).toBe(expected);
  });
});

describe('isString', () => {
  it('should return true for a string', () => {
    expect(isString('str')).toBe(true);
  });

  it('should return false for non-string values', () => {
    const falseItems = commonObjects.filter((value: unknown) => typeof value !== 'string');

    falseItems.forEach((value) => {
      expect(isString(value)).toBe(false);
    });
  });
});

describe('isDateObject', () => {
  it('should return true for Date objects', () => {
    expect(isDateObject(new Date())).toBe(true);
  });

  it('should return false for non-Date objects', () => {
    const falseItems = commonObjects.filter((value: unknown) => !(value instanceof Date));

    falseItems.forEach((value) => {
      expect(isDateObject(value)).toBe(false);
    });
  });
});

describe('isRegex', () => {
  it('should return true for RegExp objects', () => {
    expect(isRegex(/^fo(ba)?$/i)).toBe(true);
  });

  it('should return false for non-RegExp objects', () => {
    const falseItems = commonObjects.slice(2).filter((value) => !(value instanceof RegExp));

    falseItems.forEach((value) => {
      expect(isRegex(value)).toBe(false);
    });
  });
});

describe('isObject', () => {
  it('should return true for plain objects', () => {
    expect(isObject({})).toBe(true);
  });

  it('should return false for non-object values', () => {
    const falseItems = commonObjects.slice(2);

    falseItems.forEach((value) => {
      expect(isObject(value)).toBe(false);
    });
  });
});

describe('isNumber', () => {
  test.each`
    input         | expected
    ${-1}         | ${true}
    ${0}          | ${true}
    ${1}          | ${true}
    ${Number.NaN} | ${false}
    ${''}         | ${false}
    ${'1'}        | ${false}
    ${null}       | ${false}
    ${undefined}  | ${false}
    ${true}       | ${false}
  `('should return $expected for input $input', ({input, expected}) => {
    expect(isNumber(input)).toBe(expected);
  });
});
