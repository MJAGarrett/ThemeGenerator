export const clamp = (val: number, lower: number, higher: number): number => {
  if (val <= lower) return lower;
  if (val >= higher) return higher;

  return val;
};

/**
 * Tests whether a number is in the range [lower, higher].
 * @param val Value to test
 * @param lower Lower bound, inclusive
 * @param higher Upper bound, inclusive
 */
export const isBetween = (val: number, lower: number, higher: number): boolean => {
  if (lower > higher) throw new Error("Lower bound cannot be higher than upper bound");

  return val >= lower && val <= higher;
};
