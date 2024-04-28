import { RStack, RText } from '@packrat/ui';
import MapContainer from 'app/components/map/MapContainer';
import useTheme from 'app/hooks/useTheme';
import { TripCardBase } from './TripCardBase';
import { FontAwesome5 } from '@expo/vector-icons';

type TripMapCardProps = {
  isLoading?: boolean;
  shape: any;
};

export const TripMapCard = ({ isLoading, shape }: TripMapCardProps) => {
  const { currentTheme } = useTheme();

  return (
    <TripCardBase
      loadStyles={loadStyles}
      icon={() => (
        <FontAwesome5
          name="route"
          size={24}
          color={currentTheme.colors.cardIconColor}
        />
      )}
      title="Map"
    >
      {isLoading ? (
        <RStack>
          <RText>Loading....</RText>
        </RStack>
      ) : (
        <MapContainer shape={shape} />
      )}
    </TripCardBase>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    backgroundColor: currentTheme.colors.card,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: currentTheme.size.cardPadding,
    paddingHorizontal: currentTheme.padding.paddingInside,
    marginBottom: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  };
};
