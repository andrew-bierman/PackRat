import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export default function useDetails(data) {
  const weatherObject = useSelector(
    (state: RootState) => state.weather.weatherObject,
  );
  const weatherWeek = useSelector(
    (state: RootState) => state.weather.weatherWeek,
  );
  const isOwner =
    data?.owner_id === useSelector((state: RootState) => state.auth.user?._id);

  return { weatherObject, weatherWeek, isOwner };
}
