// @flow

import 'es6-symbol/implement';
import 'es7-object-polyfill';
import { AppRegistry } from 'react-native';

import AppContainer from './app/components/AppContainer';

AppRegistry.registerComponent('TwilioRN', () => AppContainer);
