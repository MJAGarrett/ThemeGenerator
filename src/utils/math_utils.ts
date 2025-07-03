export const clamp = (val: number, lower: number, higher: number): number => {
  if (val <= lower) return lower;
  if (val >= higher) return higher;

  return val;
};
