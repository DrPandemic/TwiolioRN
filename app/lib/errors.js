// @flow

import match from './match';

export default (error: any): string =>
  match(
    error, JSON.stringify(error, Object.getOwnPropertyNames(error)),
    [(e: any) => (typeof e) === 'symbol', error],
  );
