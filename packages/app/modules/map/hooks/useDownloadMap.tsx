import { useAuthUser } from 'app/modules/auth';
import { queryTrpc } from 'app/trpc';
import { OFFLINE_MAP_STYLE_URL } from '../constants';

export interface UserRemoteMap {
  name: string;
  styleURL: string;
  bounds: any;
  minZoom: number;
  maxZoom: number;
  owner_id: string;
  metadata: {
    userId: string;
    id?: string;
    shape: string;
  };
}

export const useDownloadMap = (onDownload) => {
  const { mutateAsync, isLoading } = queryTrpc.saveOfflineMap.useMutation();
  const authUser = useAuthUser();

  const handleDownloadMap = ({ mapName, bounds, shape }) => {
    const downloadOptions: UserRemoteMap = {
      name: mapName,
      styleURL: OFFLINE_MAP_STYLE_URL,
      bounds,
      minZoom: 0,
      maxZoom: 8,
      owner_id: authUser.id,
      metadata: {
        userId: authUser?.id,
        shape: JSON.stringify(shape) || '',
      },
    };

    // Save the map under user profile.
    mutateAsync(downloadOptions)
      .then((data) => {
        onDownload({
          ...downloadOptions,
          metadata: {
            ...data.metadata,
            id: data.id,
          },
        });
      })
      .catch((e) => {});
  };

  return { handleDownloadMap, isSaving: isLoading };
};
