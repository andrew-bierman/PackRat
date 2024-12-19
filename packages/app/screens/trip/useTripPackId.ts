import { usePackId } from 'app/modules/pack';
import { useTripContext } from 'app/modules/trip/context/tripContext';

export const useTripPackId = () => {
  const packIdSearch = usePackId();
  const { tripPack } = useTripContext();
  // Trip pack is used in edit mode
  return tripPack || packIdSearch;
};
