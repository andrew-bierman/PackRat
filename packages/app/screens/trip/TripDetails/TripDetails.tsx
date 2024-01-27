import React from 'react';
import { View } from 'react-native';
import { RootState } from 'store/store';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import DetailsComponent from './DetailsComponent';
import loadStyles from './styles/styles';
import { useTripDetails } from './hooks/useTripDetails'; // Import your custom hook

export function TripDetails() {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { data, isLoading, isError, link } = useTripDetails(); // Use your custom hook

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
