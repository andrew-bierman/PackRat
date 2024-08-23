import React from 'react';
import Bugsnag from './Bugsnag';

export const BugsnagErrorBoundary =
  Bugsnag.getPlugin('react')?.createErrorBoundary(React);
