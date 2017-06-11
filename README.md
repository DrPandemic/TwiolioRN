# TwiolioRN
A react native SMS client based on Twilio. This uses Twilio numbers and APIs.
Currently, this project is only tested on Android.

## Objectives
The cellphone plans are way to expensive where I live while tablet plans are more accessible. Also, it would be great
for travellers since it would eliminate many roaming issues.

This application could also be "translated" to normal react and be used to access your SMS on a computer.

I'm doing this project to learn React Native. So feel free to open PRs to improve the codebase.

## TODO
- [x] Be able to select phone numbers
  - [ ] Change the visual to more easily understand that's a dropdown
- [x] Display conversations by number
- [x] Display all conversations
- [ ] Order messages
- [ ] Good errors when env is not loaded
- [ ] Display a conversation
- [ ] Manage multipart messages
- [ ] Send SMS
- [ ] Start new conversation
- [ ] Use contacts to display names
- [ ] Save already received messages
  - [ ] Display phone numbers with conversations but that wasn't received by the API
- [ ] Reduce network usage
  - [ ] Configurable fetch timeout
  - [ ] Don't ask twice for the same SMS
- [ ] Login page to replace configs

### Evolution (If I finished the project and want to sell an easier experience)
- [ ] A way to create a Twilio account from the app
- [ ] Account managing page
  - [ ] Balance
  - [ ] Usage history
- [ ] Buy phone numbers
- [ ] Have servers
  - [ ] To manage accounts
  - [ ] To do push notifications

## Tech
- React Native
- React
- Redux
- Redux-loop
- Flow (a little bit)
- Jest

**Not** using immutable.js. I don't use it since I think it would prevent me from doing my type definitions with flow.
If I'm wrong or if you think it could help me to use it, please open an issue.

I chose redux-loop over others side effect management library because I like how I can write tests for it.

## Limitations
With the current version of ReactNative (0.44.0), we can't use Hot Reload with redux-loop.

You need to create yourself your Twilio account.

Currently, you also need to create a `.env` file containing your api's keys.

```
TWILIO_ACCOUNT_SID=something
TWILIO_AUTH_TOKEN=somethingelse
```

## Contribution
I was planning to do this project alone, but if you want to help I would love to work with you.
