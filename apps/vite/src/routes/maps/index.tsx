// import DownloadedMaps from "app/screens/maps";

// export default DownloadedMaps;

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/maps/')({
  component: () => null,
});

export default () => null;

// TODO - figure out if we can repurpose this on web or just delete.
