// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import { PInterval } from '../Interval';

beforeEach(() => {
  jest.useFakeTimers();
});

test('initially call all actions', () => {
  const spyNumber = jest.fn().mockReturnValue(Promise.resolve());
  const spyMessage = jest.fn().mockReturnValue(Promise.resolve());
  renderer.create(<PInterval
     fetchAccountNumbers={spyNumber}
     fetchMessages={spyMessage}
    />);

  expect(spyNumber).toBeCalled();
  expect(spyMessage).toBeCalled();
});

test('message fetching is peridocally called but not numbers', done => {
  let count = 2;
  const spyNumber = jest.fn().mockReturnValue(Promise.resolve());
  const spyMessage = jest.fn().mockReturnValue(Promise.resolve());

  // This could be nicer
  // It's calling twice a timer and look at the final state
  renderer.create(<PInterval
     fetchAccountNumbers={spyNumber}
     fetchMessages={spyMessage}
     tickDone={() => {
       if (--count >= 0) {
         jest.runOnlyPendingTimers();
       } else {
         expect(spyNumber.mock.calls.length).toEqual(1);
         expect(spyMessage.mock.calls.length).toEqual(3);
         done();
       }
     }}
    />);
});
