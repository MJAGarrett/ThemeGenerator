import { isNone, isSome, None, Optional, Some } from "../../src/Monads/Optional";

export const assertIsSome: <T>(value: Optional<T>) => asserts value is Some<T> =
  (value) => {
    if (!isSome(value))
      throw new Error("Value should not be none");
  };

export const assertIsNone: <T>(value: Optional<T>) => asserts value is None =
  (value) => {
    if (!isNone(value))
      throw new Error("Value should not be some");
  };
