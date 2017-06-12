// @flow

import equal from 'deep-equal';

export default function match(
  value: any,
  defaultValue: any,
  [matcher, matcherValue]: [any, any],
  ...rest: Array<[ any, any ]>
): any {
  if (typeof matcher === 'function' && matcher(value)) {
    // The matcher is a function and returned true
    return matcherValue;
  } else if (equal(value, matcher)) {
    // The matcher works
    return matcherValue;
  } else if (rest.length === 0) {
    // No more matcher, use default
    return defaultValue;
  }
  return match(value, defaultValue, rest.pop(), ...rest);
}
