import { Cmd, loop } from 'redux-loop';

jest.mock('../../store');

import { restore } from '../../types/ConversationStore';
import { reducer, initialState } from '../messages';
import effects from '../../effects';
import * as actions from '../../actions/messages';
import * as persistActions from '../../actions/persist';
import { getApi } from '../../lib/api';
import { Message } from '../../types';
import fixture from '../../test_helpers/fixtures/received_message.json';
import conversationFixture from '../../test_helpers/fixtures/conversation_store.json';

test('reducer.FETCH_MESSAGES', () => {
  const lastFetch = Symbol('lastFetch');
  const state = { ...initialState, loading: false, lastFetch };

  const result = reducer(state, actions.fetchMessages());

  expect(result).toEqual(loop(
    { ...initialState, loading: true, lastFetch },
    Cmd.run(effects.fetchMessages, {
      successActionCreator: actions.successFetchMessages,
      failActionCreator: actions.failFetchMessages,
      args: [getApi(), lastFetch],
    })
  ));
});

test('reducer.SET_FETCHED_MESSAGES', () => {
  const state = { ...initialState };
  const m = new Message(fixture.simple);

  const result = reducer(state, actions.successFetchMessages([m]));

  expect(result).toEqual(loop(
    {
      ...initialState,
      messages: { [m.conversationId]: [m] },
      lastFetch: new Date(fixture.simple.date_sent),
    },
    Cmd.action(persistActions.persistStore())
  ));
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

  [state] = reducer(state, actions.successFetchMessages([m]));
  state = reducer(state, actions.failFetchMessages(e));

  expect(state).toEqual({
    ...initialState,
    messages: { [m.conversationId]: [m] },
    error: e,
    lastFetch: m.dateSent,
  });
});

test('RESTORE_STORE', () => {
  const state = {
    ...initialState,
    error: Symbol('error'),
    loading: true,
    lastFetch: null,
  };
  const lastFetch = '2017-07-12T18:11:43.542Z';

  const result = reducer(state, persistActions.successRestoreStore({
    messages: {
      messages: conversationFixture.simple,
      loading: true,
      lastFetch,
    },
  }));

  expect(result).toEqual({
    ...state,
    messages: restore(conversationFixture.simple),
    error: null,
    loading: false,
    lastFetch: new Date(lastFetch),
  });
});

test('TICK', () => {
  const state = { ...initialState, loading: false };

  const result = reducer(state, persistActions.tick());

  expect(result).toEqual(loop(
    { ...initialState },
    Cmd.action(actions.fetchMessages(initialState.lastFetch))
  ));
});

test("Doesn't crash on empty restore", async () => {
  const state = { ...initialState };

  const result = reducer(state, persistActions.successRestoreStore({}));

  expect(result).toEqual({ ...initialState });
});

test('SEND_MESSAGE', () => {
  const to = 'to';
  const from = 'from';
  const body = 'body';
  const state = { ...initialState, sending: false };

  const result = reducer(state, actions.sendMessage(to, from, body));

  expect(result).toEqual(loop(
    { ...initialState, sending: true },
    Cmd.run(effects.sendMessage, {
      successActionCreator: actions.successSendMessage,
      failActionCreator: actions.failSendMessage,
      args: [getApi(), to, from, body],
    })
  ));
});
