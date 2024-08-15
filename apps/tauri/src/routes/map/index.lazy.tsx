import React from 'react';
// import Map from "app/screens/map";

// export default Map;
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/map/')({
  component: () => null,
});

export default () => null;

// TODO - figure out if we can repurpose this on web or just delete.
