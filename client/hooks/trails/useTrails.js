import React from 'react';
import { trpc } from '../../trpc';

function useTrails({ lat, lon, selectedSearch, radius = 500 }) {
  const { data, error, isLoading } = trpc.getTrailsOSM.query({
    lat,
    lon,
    radius,
    selectedSearch,
  }); // Assumed to be a valid hook from tRPC.

  const filteredTrails = () => {
    if (!data) return [];
    return data.features
      .filter(
        (trail) =>
          trail.properties.name && trail.properties.name !== selectedSearch,
      )
      .map((trail) => trail.properties.name)
      .slice(0, 25);
  };

  return { filteredTrails, data, error, isLoading };
}

export default useTrails;
