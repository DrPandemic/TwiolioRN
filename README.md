# TwiolioRN
A react native SMS client based on Twilio. This uses Twilio numbers and APIs.
Currently, this project is only tested on Android.

## Objectives
The cellphone plans are way to expensive where I live while tablet plans are more accessible. Also, it would be great
for travellers since it would eliminate many roaming issues.

This application could also be "translated" to normal react and be used to access your SMS on a computer.

I'm doing this project to learn React Native. So feel free to open PRs to improve the codebase.

## TODO
- [ ] Manage phone numbers
- [ ] Display conversations by number
- [ ] Display SMS by receiving number
- [ ] Send SMS
- [ ] Save already received messages
- [ ] Reduce network usage
  - [ ] Configurable fetch timeout
  - [ ] Don't ask twice for the same SMS
- [ ] Login page to replace configs
- [ ] A way to create a Twilio account from the app
- [ ] Account managing page
  - [ ] Balance
  - [ ] Usage history
- [ ] Buy phone numbers

### Evolution (If I finished the project and want to sell an easier experience)
- [ ] Have servers
  - [ ] To manage accounts
  - [ ] To do push notifications

## Tech
- React Native
- React
- Redux
- Redux-loop
- React-native-router-flux
- Flow (a little bit)
- Jest

**Not** using immutable.js. I don't use it since I think it would prevent me from doing my type definitions with flow.
If I'm wrong or if you think it could help me to use it, please open an issue.

I chose redux-loop over others side effect management library because I like how I can write tests for it.

## Limitations
With the current version of ReactNative (0.44.0), we can't use Hot Reload with redux-loop for some reason releated to Symbols.
I tried to add polyfills, but I had other issues.

You need to create yourself your Twilio account.

Currently, you also need to create a `.env` file containing your api's keys.

```
TWILIO_ACCOUNT_SID=something
TWILIO_AUTH_TOKEN=somethingelse
```

## Contribution
I was planning to do this project alone, but if you want to help I would love to work with you.
