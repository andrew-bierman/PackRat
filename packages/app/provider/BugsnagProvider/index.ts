import React from 'react';
import Bugsnag from './Bugsnag';
import { BUGSNAG_API_KEY } from '@packrat/config';

export const BugsnagErrorBoundary = BUGSNAG_API_KEY
  ? Bugsnag.getPlugin('react')?.createErrorBoundary(React)
  : React.Fragment;
