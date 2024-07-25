import Bugsnag from '@bugsnag/expo';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPluginExpoApp from '@bugsnag/plugin-expo-app';
import BugsnagPluginExpoDevice from '@bugsnag/plugin-expo-device';

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  plugins: [BugsnagPluginReact, BugsnagPluginExpoApp, BugsnagPluginExpoDevice],
});

export default Bugsnag;
