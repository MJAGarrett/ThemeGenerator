export const assertIsNonNull: <T>(value: T | null | undefined) => asserts value is NonNullable<T> =
  (value) => {
    if (value === null || value === undefined)
      throw new Error("Value should not be null");
  };
