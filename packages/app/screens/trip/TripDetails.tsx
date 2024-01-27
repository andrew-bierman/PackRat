import React from 'react';
import { View } from 'react-nat../../../components/details/headerder
import { RootState } from 'store/store';
import useTheme from '../../hook../../../components/pack_table/Tableble
import useCustomStyles from 'app../../../store/packsStoreore';
import DetailsComponent from './TripDetails/DetailsComponent';
import loadStyles from './TripDetails/styles/styles';
import { useTripDetails } from './TripDetails/hooks/useTripDetails'; // custom hook
../../../components/details../../../components/details
export function TripDetails() {
  const { currentTheme ../../../themeemee();
  const styles = useCustomStyles(loadStyles);
  const { data, isLoading, i../../../components/ScoreContainerner(); // Use custom hook
../../../components/weath../../../components/weather/WeatherCard
  // console.log("🚀 ~../../../components/TripCardard~ TripDetails ~ tripId:", tripId) const { data, isLoading, error, refetch, isOwner, isError } = useFetchSingleTrip(tripId);

  // useEffect(() => { // if (!tripId) return../../../utils/mapFunctionsonseTrip(tripId)); // }, [dispatch, tripId]); const states = useSelector((state: RootState) => state);
../../../hooks/useThem../../../hooks/useTheme
  // const user = useSelector((state) => state.auth.user);

  // check if user is owner of pack, and that pack and user exists // const isOwner = currentTrip && user && currentTrip.owner_id === user._id;

  // const isLoading = useSelector((state) => state.singleTrip.isLoading); // const error = useSelector((state) => state.singleTrip.error); // const isError = error !== null;

  if (isLoading) return <RText>Loading...</RText>;

  return (
    <View
      style={[
        styles.mainContainer,
        Platform.OS == 'web' ? { minHeight: '100vh' } : null,
      ]}
    >
      {!isError && (
        <DetailsComponent
          type="trip"
          data={data}
          isLoading={isLoading}
          link={link}
        />
      )}
    </View>
  );
}
