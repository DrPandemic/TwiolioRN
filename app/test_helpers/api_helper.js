// @flow

import equal from 'deep-equal';

type Mock = {
  url: string,
  params: ?Object,
  expandRoute: boolean,
  resolve: boolean,
  result: any,
};

function requestMatch(
  url: string,
  params: ?Object,
  expandRoute: boolean,
  mock: Mock
): boolean {
  return mock.resolve &&
         url === mock.url &&
         expandRoute === mock.expandRoute &&
         equal(params, mock.params);
}

export default class MockApi {
  mock(fn: string, resolve: boolean, result: any) {
    if (resolve) {
      this[fn] = jest.fn().mockReturnValueOnce(
        Promise.resolve({
          json: () => Promise.resolve(result)
        })
      );
    } else {
      this[fn] = jest.fn().mockReturnValueOnce(Promise.reject(result));
    }

    return this;
  }

  multiMock(fn: string, mocks: Array<Mock>) {
    this[fn] = jest.fn();

    for (const mock of mocks) {
      this[fn].mockImplementationOnce((
        url: string,
        params: ?Object,
        expandRoute: boolean = true,
      ) => {
        if (!requestMatch(url, params, expandRoute, mock)) {
          return Promise.reject(mock.result);
        }

        return Promise.resolve(mock.result);
      });
    }

    return this;
  }
}
