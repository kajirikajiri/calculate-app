export type Result<T, E> = Ok<T, E> | Err<T, E>;

type Ok<T, _> = {
  isOk: true;
  isErr: false;
  value: T;
};

type Err<_, E> = {
  isOk: false;
  isErr: true;
  value: E;
};

export const ok = <T, E>(value: T): Result<T, E> => ({
  isOk: true,
  isErr: false,
  value,
});

export const err = <T, E>(value: E): Result<T, E> => ({
  isOk: false,
  isErr: true,
  value,
});
