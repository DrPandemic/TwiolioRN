import { Effects, loop } from 'redux-loop';

jest.mock('../../store');

import { restore } from '../../types/ConversationStore';
import { reducer, initialState } from '../messages';
import effects from '../../effects';
import * as actions from '../../actions/messages';
import * as persistActions from '../../actions/persist';
import LibApi from '../../lib/api';
import { Message } from '../../types';
import fixture from '../../test_helpers/fixtures/received_message.json';
import conversationFixture from '../../test_helpers/fixtures/conversation_store.json';

test('reducer.FETCH_MESSAGES', () => {
  const state = { ...initialState, loading: false };

  const result = reducer(state, actions.fetchMessages());

  expect(result).toEqual(loop(
    { ...initialState, loading: true },
    Effects.promise(effects.fetchMessages, LibApi)
  ));
});

test('reducer.SET_FETCHED_MESSAGES', () => {
  const state = { ...initialState };
  const m = new Message(fixture.simple);

  const result = reducer(state, actions.successFetchMessages([m]));

  expect(result).toEqual({
    ...initialState,
    messages: { [m.conversationId]: [m] },
  });
});

test('reducer.FETCH_MESSAGES_ERROR', () => {
  const state = { ...initialState };
  const s = Symbol('error');

  const result = reducer(state, actions.failFetchMessages(s));

  expect(result).toEqual({ ...initialState, error: s });
});

test('success followed by an error', () => {
  let state = { ...initialState };
  const m = new Message(fixture.simple);
  const e = Symbol('error');

  state = reducer(state, actions.successFetchMessages([m]));
  state = reducer(state, actions.failFetchMessages(e));

  expect(state).toEqual({
    ...initialState,
    messages: { [m.conversationId]: [m] },
    error: e,
  });
});

test('RESTORE_STORE', () => {
  const state = {
    ...initialState,
    error: Symbol('error'),
    loading: true,
  };

  const result = reducer(state, persistActions.successRestoreStore({
    messages: {
      messages: conversationFixture.simple,
    },
  }));

  expect(result).toEqual({
    ...state,
    messages: restore(conversationFixture.simple),
    error: null,
    loading: false,
  });
});

test('TICK', () => {
  const state = { ...initialState, loading: false };

  const result = reducer(state, persistActions.tick());

  expect(result).toEqual(loop(
    { ...initialState },
    Effects.constant(actions.fetchMessages())
  ));
});
