import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { BUGSNAG_API_KEY } from '@packrat/config';

if (BUGSNAG_API_KEY) {
  Bugsnag.start({
    apiKey: BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
  });
}

export default Bugsnag;
