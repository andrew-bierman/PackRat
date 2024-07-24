import Bugsnag from '@bugsnag/expo';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPluginExpoApp from '@bugsnag/plugin-expo-app';
import BugsnagPluginExpoDevice from '@bugsnag/plugin-expo-device';

Bugsnag.start({
  apiKey: 'd92cb1ab6783c77d1c4b2404641ffdfc',
  plugins: [BugsnagPluginReact, BugsnagPluginExpoApp, BugsnagPluginExpoDevice],
});

export default Bugsnag;
