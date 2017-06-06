// @flow

import equal from 'deep-equal';

export default function match(
  value: any,
  defaultValue: any,
  [matcher, matcherValue]: [any, any],
  ...rest: Array<[ any, any ]>
): any {
  if (equal(value, matcher)) {
    return matcherValue;
  } else if (rest.length === 0) {
    return defaultValue;
  }
  return match(value, defaultValue, rest.pop(), ...rest);
}
