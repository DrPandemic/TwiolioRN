// @flow

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
}
