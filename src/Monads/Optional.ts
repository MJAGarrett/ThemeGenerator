export interface Some<T> {
  kind: "some";
  payload: T;
}

export interface None { kind: "none"; }

export type Optional<T> = Some<T> | None;

export const isNone = <T>(val: Optional<T>): val is None => {
  return val.kind === "none";
};

export const isSome = <T>(val: Optional<T>): val is Some<T> => {
  return val.kind === "some";
};

export const none = (): None => {
  return { kind: "none" };
};

export const some = <T>(val: T): Some<T> => {
  return {
    kind: "some",
    payload: val,
  };
};

export const extract = <T>(val: Some<T>): T => {
  return val.payload;
};

export const map = <T, U>(opt: Optional<T>, f: (a: T) => U): Optional<U> => {
  return isNone(opt) ? opt : some(f(opt.payload));
};

export const bind = <T, U>(a: Optional<T>, f: (a: T) => Optional<U>) => {
  return isNone(a) ? a : f(a.payload);
};

export const optional = <T, U, V>(val: Optional<T>, onSome: (t: T) => U, default_value: V) => {
  if (isSome(val)) return onSome(val.payload);
  return default_value;
};
