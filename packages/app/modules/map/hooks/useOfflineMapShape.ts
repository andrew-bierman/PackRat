import { offlineManager } from '@rnmapbox/maps';
import { useEffect, useState } from 'react';

export const useOfflineMapShape = (offlineMapName?: string) => {
  const [shape, setShape] = useState();
  const [isLoading, setIsLoading] = useState(!!offlineMapName);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!offlineMapName) {
        return;
      }
      try {
        const offlineMapPack = await offlineManager.getPack(offlineMapName);
        if (offlineMapPack?.metadata?.shape && isMounted) {
          setShape(offlineMapPack.metadata.shape);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [offlineMapName]);

  return { shape, isLoading };
};
