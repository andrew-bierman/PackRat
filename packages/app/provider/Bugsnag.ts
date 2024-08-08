import Bugsnag from '@bugsnag/expo';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPluginExpoApp from '@bugsnag/plugin-expo-app';
import BugsnagPluginExpoDevice from '@bugsnag/plugin-expo-device';
import { BUGSNAG_API_KEY } from '@packrat/config';

Bugsnag.start({
  apiKey: BUGSNAG_API_KEY,
  plugins: [BugsnagPluginReact, BugsnagPluginExpoApp, BugsnagPluginExpoDevice],
});

export default Bugsnag;
