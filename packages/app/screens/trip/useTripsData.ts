// useTripsData.js
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFetchWeather, useFetchWeatherWeak } from 'app/hooks/weather';
import useParks from 'app/hooks/parks';
import useTrails from 'app/hooks/trails';
import {
  useCurrentDestination,
  useGetPhotonDetails,
} from 'app/hooks/destination';
import { useGEOLocationSearch } from 'app/hooks/geojson';
import { useSearchParams } from 'app/hooks/common';

// const TripSchema = z.object({
//   dateRange: z.object({
//     startDate: z.date(),
//     endDate: z.date()
//   }).required(),
//   packId: z.string().trim().min(1),
//   osm: z.object({
//     osmId: z.string().trim().min(1),
//     osmType: z.string().trim().min(1),
//     name: z.string().trim().min(1)
//   }).required(),
// }).required();

const TripSchema = z.object({});

export const useTripsData = () => {
  const searchParams = useSearchParams();

  const form = useForm({
    defaultValues: {
      dateRange: {
        startDate: undefined,
        endDate: undefined
      },
      currentPark: '',
      currentTrail: '',
      packId: '',
      osm: {
        osmId: '',
        osmType: '',
        name: ''
      }
    },
    resolver: zodResolver(TripSchema)
  });

  const { control, watch, setValue, formState, handleSubmit, getValues, reset, trigger } = form;

  const dateRange = watch('dateRange');
  const currentTrail = watch('currentTrail');
  const currentPark = watch('currentPark');
  const packId = watch ('packId');

  const setDateRange = (updatedDateRange) => setValue('dateRange', updatedDateRange, { shouldValidate: true });
  const setPackId = (updatedPackId) => setValue('packId', updatedPackId, { shouldValidate: true });
  const setOsm = (updatedOsm) => setValue('osm', updatedOsm, { shouldValidate: true });

  useEffect(() => {
    const defaultPackId = searchParams.get('packId');
    if (defaultPackId) setPackId(defaultPackId);
  }, [])

  //TODO: review this code snippet to see if it causes any potential issues
  const togglePlace = (isPark, value) => {
    const name = isPark ? 'currentPark' : 'currentTrail';
    const formValues = getValues();
    const newValue = formValues[name] === value ? '' : value;

    console.log(name, value);

    reset({ ...formValues, [name]: newValue });
  };

  // const [dateRange, setDateRange] = useState({
  //   startDate: undefined,
  //   endDate: undefined,
  // });
  const [osm] = useGEOLocationSearch();
  const { currentDestination, latLng } = useCurrentDestination();
  const { data: photonDetails } = useGetPhotonDetails({
    properties: {
      osm_id: osm?.osmId,
      osm_type: osm?.osmType,
    },
  });

  useEffect(() => {
    console.log(osm, 'updated osm');
    if (osm.name && osm.osmId && osm.osmType) {
      setOsm({...osm});
    }
  }, [osm]);

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
  });

  const { data, filteredTrails, error, isLoading } = useTrails({
    latLng,
    selectedSearch: osm.name,
  });

  return {
    dateRange,
    setDateRange,
    handleSubmit,
    currentTrail,
    currentPark,
    togglePlace,
    packId,
    setPackId,
    osm,
    currentDestination,
    latLng,
    photonDetails,
    weatherData,
    weatherLoading,
    weatherError,
    weatherWeekData,
    weekWeatherLoading,
    weekWeatherError,
    parksData,
    parksError,
    parksLoading,
    filteredTrails,
    trailsError: error,
    trailsLoading: isLoading,
    formErrors: formState.errors,
    form
  };
};
