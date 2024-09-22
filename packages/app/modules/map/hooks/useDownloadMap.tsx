import { useAuthUser } from 'app/modules/auth';
import { queryTrpc } from 'app/trpc';

export const useDownloadMap = (onDownload) => {
  const { mutateAsync, isLoading } = queryTrpc.saveOfflineMap.useMutation();
  const authUser = useAuthUser();

  const handleDownloadMap = ({ mapName, bounds, shape }) => {
    const downloadOptions = {
      name: mapName,
      styleURL: 'mapbox://styles/mapbox/outdoors-v11',
      bounds,
      minZoom: 0,
      maxZoom: 8,
      owner_id: authUser.id,
      metadata: {
        shape: JSON.stringify(shape),
      },
    };

    // Save the map under user profile.
    mutateAsync(downloadOptions)
      .then(() => {
        onDownload(downloadOptions);
      })
      .catch(() => {});
  };

  return { handleDownloadMap, isSaving: isLoading };
};
