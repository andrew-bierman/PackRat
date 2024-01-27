import React from 'react';
import { View } from 'react-native';
import { RootState } from 'store/store';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import DetailsComponent from './DetailsComponent';
import loadStyles from './styles/styles';
import { useTripDetails } from './hooks/useTripDetails'; // custom hook

export function TripDetails() {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { data, isLoading, isError, link } = useTripDetails(); // Use custom hook

  // console.log("🚀 ~ file: TripDetails.js:34 ~ TripDetails ~ tripId:", tripId) const { data, isLoading, error, refetch, isOwner, isError } = useFetchSingleTrip(tripId);

  // useEffect(() => { // if (!tripId) return; // dispatch(fetchSingleTrip(tripId)); // }, [dispatch, tripId]); const states = useSelector((state: RootState) => state);

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
