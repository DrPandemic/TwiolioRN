// @flow

export function flatMap<T, U>(
  array: Array<T>,
  lambda: (T, number, Array<T>) => Array<U>
): Array<U> {
  return [].concat(...array.map(lambda));
}
