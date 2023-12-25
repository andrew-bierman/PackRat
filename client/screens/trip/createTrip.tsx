import { RStack } from '@packrat/ui';
import { ScrollView } from 'react-native';
import { theme } from '../../theme';
import TripCard from '../../components/TripCard';
import WeatherCard from '../../components/weather/WeatherCard';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GearList } from '../../components/GearList';
import { SaveTripContainer } from '~/components/trip/createTripModal';
import TripDateRange from '~/components/trip/TripDateRange';
import { useFetchWeather, useFetchWeatherWeak } from '~/hooks/weather';
// import MultiStepForm from "../multi_step";
// import { photonDetails } from '../../store/destinationStore';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
import useParks from '~/hooks/parks';
import useTrails from '~/hooks/trails';
import { useGetPhotonDetails } from '~/hooks/destination';
import {useSearch} from '../../context/searchContext'


export default function Trips() {

  const {state} = useSearch()
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  // const [parksData, setParksData] = useState();
  const [trails, setTrailsData] = useState();
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const dispatch = useDispatch();
  const searchResult = useSelector(
    (state) => state.search.selectedSearchResult,
  );
  console.log('state',state.selectedSearchResult)

  const weather = useSelector((state) => state.weather);
  const {selectedSearch} = weather;
  const {lon,lat} = weather.weatherObject.coord

  const coordinates = state?.selectedSearchResult?.geometry?.coordinates;
  const latLng = Array.isArray(coordinates) && { lon:coordinates[0],lat:coordinates[1]} || {lon,lat}
 
  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useFetchWeather(latLng);
  const {
    data: weatherWeekData,
    isLoading: weekWeatherLoading,
    isError: weekWeatherError,
  } = useFetchWeatherWeak(latLng);
 


  const {
    data: parks,
    error: parksError,
    isLoading: parksLoading,
    filteredParks: parksData,
  } = useParks({
    latLng,
    selectedSearch,
  });

  const { data, filteredTrails, error, isLoading } = useTrails({
    latLng,
    selectedSearch,
  });


  const { data: photonDetails } = useGetPhotonDetails({
    properties: {
      osm_id: state?.selectedSearchResult?.properties?.osm_id,
      osm_type: state?.selectedSearchResult?.properties?.osm_type,
    },
  });
 

  return (
    <ScrollView nestedScrollEnabled={true}>
      <RStack style={styles.mutualStyles}>
        {/* <MultiStepForm steps={steps} /> */}
        <RStack style={styles.container}>
          <TripCard
            title="Where are you heading?"
            isSearch={true}
            Icon={() => (
              <FontAwesome
                name="map"
                size={20}
                color={currentTheme.colors.cardIconColor}
              />
            )}
          />
          {!weekWeatherError &&
            !weatherError &&
            !weatherLoading &&
            !weekWeatherLoading && (
              <WeatherCard
                weatherObject={weatherData}
                weatherWeek={weatherWeekData}
              />
            )}
          <TripCard
            title="Nearby Trails"
            value="Trail List"
            isTrail={true}
            data={filteredTrails || []}
            Icon={() => (
              <FontAwesome5
                name="hiking"
                size={20}
                color={currentTheme.colors.cardIconColor}
              />
            )}
          />
          <TripCard
            title="Nearby Parks"
            value="Parks List"
            isPark={true}
            data={parksData}
            Icon={() => (
              <FontAwesome5
                name="mountain"
                size={20}
                color={currentTheme.colors.cardIconColor}
              />
            )}
          />
          <GearList />
          <TripDateRange dateRange={dateRange} setDateRange={setDateRange} />
          {!photonDetails?.IsError && !photonDetails?.isLoading && (
            <TripCard
              Icon={() => (
                <FontAwesome5
                  name="route"
                  size={24}
                  color={currentTheme.colors.cardIconColor}
                />
              )}
              title="Map"
              isMap={true}
              shape={photonDetails}
            />
          )}
          {photonDetails && <WeatherData geoJSON={photonDetails} />}
          <RStack>
            <SaveTripContainer dateRange={dateRange} photonData={photonDetails} />
          </RStack>
        </RStack>
      </RStack>
    </ScrollView>
  );
}

const loadStyles = () => ({
  mutualStyles: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    paddingBottom: 30,
  },
  container: {
    gap: 50,
    padding: 50,
  },
});
