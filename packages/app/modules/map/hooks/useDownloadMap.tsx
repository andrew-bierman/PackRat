import { useUserQuery } from 'app/modules/auth';
import { useUpdateUser } from 'app/modules/user';

export const useDownloadMap = (onDownload) => {
  const { user, refetch } = useUserQuery();
  const updateUser = useUpdateUser();

  const handleDownloadMap = ({ mapName, bounds, shape }) => {
    const downloadOptions = {
      name: mapName,
      styleURL: 'mapbox://styles/mapbox/outdoors-v11',
      bounds,
      minZoom: 0,
      maxZoom: 8,
      metadata: {
        shape: JSON.stringify(shape),
      },
    };

    // Save the map under user profile.
    updateUser({
      id: user.id,
      offlineMaps: {
        ...(user.offlineMaps || {}),
        [mapName.toLowerCase()]: downloadOptions,
      },
    })
      .then(async () => refetch())
      .then(() => {
        onDownload(downloadOptions);
      })
      .catch(() => {});
  };

  return { handleDownloadMap };
};
