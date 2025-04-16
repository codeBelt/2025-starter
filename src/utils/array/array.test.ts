import {describe, expect, it} from 'bun:test';
import {uniqArray} from './array';

describe('uniqArray', () => {
  const duplicatedArray = ['a', 'b', 'b', 'c'];
  const noneDuplicatedArray = ['a', 'b', 'c'];

  it('should return remove duplications from an array', () => {
    const returnedArray = uniqArray(duplicatedArray);

    expect(returnedArray).toEqual(noneDuplicatedArray);
  });

  it('should return the original array without duplicates', () => {
    const returnedArray = uniqArray(noneDuplicatedArray);

    expect(returnedArray).toEqual(noneDuplicatedArray);
  });
});
