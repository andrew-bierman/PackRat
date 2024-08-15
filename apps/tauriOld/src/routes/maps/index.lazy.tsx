import React from 'react';
// import DownloadedMaps from "app/screens/maps";

// export default DownloadedMaps;

import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/maps/')({
  component: () => null,
});

export default () => null;

// TODO - figure out if we can repurpose this on web or just delete.
