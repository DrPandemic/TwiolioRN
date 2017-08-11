// @flow

import { Message } from '../types';
import { FetchMessageThresholdInMinutes } from '../constants';

function fetchNextPage(
  api: any,
  url: ?string,
  expandRoute: boolean,
  messages: Array<Message>
): Promise<Array<Message>> {
  if (url === null) {
    return Promise.resolve(messages);
  }

  // Note: If one page fails, all the data is "lost"
  return api.get(url, null, null, expandRoute)
    .then(r => r.json())
    .then(r => fetchNextPage(api, r.next_page_uri, false,
      messages.concat(r.messages.map(message => new Message(message)))));
}

function pad(val: number) {
  return (`00${val}`).slice(-2);
}

function generateDateSent(lastFetch: ?Date): string {
  if (lastFetch != null) {
    let copiedLastFetch = new Date(lastFetch.getTime());
    copiedLastFetch.setMonth(copiedLastFetch.getMonth() - 1);
    copiedLastFetch.setMinutes(
      copiedLastFetch.getMinutes() - FetchMessageThresholdInMinutes
    );

    const month = pad(copiedLastFetch.getMonth() + 1);
    const day = pad(copiedLastFetch.getDate());

    return encodeURI(
      `?DateSent>=${copiedLastFetch.getFullYear()}-${month}-${day}`
    );
  }

  return '';
}

export function fetchMessages(
  api: any,
  lastFetch: ?Date = null,
): Promise<Array<Message>> {
  return fetchNextPage(
    api, `/Messages.json${generateDateSent(lastFetch)}`, true, []
  );
}

export function sendMessage(
  api: any,
  to: string,
  from: string,
  body: string,
): Promise<Message> {
  return api.post('/Messages.json', { To: to, From: from, Body: body })
    .then(r => r.json())
    .then(r => new Message(r));
}
