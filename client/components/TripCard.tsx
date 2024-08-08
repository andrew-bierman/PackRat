import { Platform } from 'react-native';
import { RStack, RText, RCard, RParagraph } from '@packrat/ui';
import { SearchInput } from './SearchInput';
import { theme } from '../theme/index';
import { useSelector, useDispatch } from 'react-redux';
import { addTrail, addPark } from '../store/dropdownStore';
import MapContainer from './map/MapContainer';
import { convertPhotonGeoJsonToShape } from '../utils/mapFunctions';
import { selectAllTrails } from '../store/trailsStore';
import useTheme from '../hooks/useTheme';
import Carousel from './carousel';
import useCustomStyles from '~/hooks/useCustomStyles';

export default function TripCard({
  title,
  Icon,
  isMap,
  shape,
  data,
  isSearch,
  isTrail,
  isPark,
}) {
  const dispatch = useDispatch();
  const { isDark, currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);

  const currentTrail = useSelector((state) => state.dropdown.currentTrail);
  const currentPark = useSelector((state) => state.dropdown.currentPark);
  const trailsDetails = useSelector(selectAllTrails); // updated selector for new trails slice
  const currentShape = trailsDetails.filter(
    (trail) => trail.properties.name == currentTrail,
  );

  const handleValueChange = (value) => {
    // Assuming that you have a redux action to set the current trail and park
    if (isTrail) {
      dispatch(addTrail(value));
    } else if (isPark) {
      dispatch(addPark(value));
    }
  };

  return (
    <RStack
      $sm={{
        borderRadius: '6px',
        flexDirection: 'colunm',
        width: '100%',
      }}
      $gtSm={{
        borderRadius: '12px',
        flexDirection: !isMap ?? 'row',
        width: '90%',
      }}
      style={
        isSearch
          ? styles.searchContainer
          : isMap
          ? styles.mapCard
          : styles.containerMobile
          ? styles.containerMobile
          : styles.mutualStyles
      }
    >
      <RStack
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          paddingVertical: 15,
        }}
      >
        <Icon />
        <RText
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            fontWeight: 600,
          }}
          fontFamily="$body"
        >
          {title}
        </RText>
      </RStack>
      {isMap ? (
        <MapContainer
          shape={
            shape ??
            (currentShape.length == 0
              ? {}
              : convertPhotonGeoJsonToShape(currentShape[0]))
          }
        />
      ) : isSearch ? (
        <SearchInput />
      ) : (
        <RStack style={{ width: '80%' }}>
          <Carousel iconColor={isDark ? '#fff' : '#000'}>
            {data?.map((item) => {
              const selectedValue = isTrail ? currentTrail : currentPark;
              return (
                <RCard
                  backgroundColor={
                    item === selectedValue ? theme.colors.background : null
                  }
                  onPress={() => {
                    handleValueChange(item);
                  }}
                  elevate
                  bordered
                  margin={2}
                >
                  <RCard.Header padded>
                    <RParagraph
                      color={item === selectedValue ? 'white' : 'black'}
                    >
                      {item}
                    </RParagraph>
                  </RCard.Header>
                </RCard>
              );
            })}
          </Carousel>
        </RStack>
      )}
    </RStack>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mutualStyles: {
      backgroundColor: currentTheme.colors.card,
      flex: 1,
      gap: 45,
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      padding: currentTheme.size.cardPadding,
      alignSelf: 'center',
    },
    containerMobile: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 25,
      flex: 1,
      paddingHorizontal: 100,
      alignSelf: 'center',
    },
    searchContainer: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      flex: 1,
      paddingHorizontal: 60,
      paddingVertical: 70,
      height: Platform.OS === 'web' ? '450px' : '100%',
      alignSelf: 'center',
    },
    mapCard: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: currentTheme.size.cardPadding,
      paddingHorizontal: currentTheme.padding.paddingInside,
      marginBottom: 20,
      height: Platform.OS === 'web' ? '650px' : '100%',
      overflow: 'hidden',
      alignSelf: 'center',
    },
  };
};
