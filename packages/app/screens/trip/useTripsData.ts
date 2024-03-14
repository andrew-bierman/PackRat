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
import { usePackId } from 'app/hooks/packs/usePackId';
import { usePackIdQParam } from 'app/hooks/packs/usePackIdQParam';
import { AddTripValidationSchema } from '@packrat/validations/src/validations/tripRoutesValidator';

export const useTripsData = () => {

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
    resolver: zodResolver(AddTripValidationSchema)
  });

  const { control, watch, setValue, formState, handleSubmit, getValues, reset, trigger } = form;

  const dateRange = watch('dateRange');
  const currentTrail = watch('currentTrail');
  const currentPark = watch('currentPark');
  const packId = watch ('packId');

  const setDateRange = (updatedDateRange) => setValue('dateRange', updatedDateRange, { shouldValidate: true });
  const setPackId = (updatedPackId) => setValue('packId', updatedPackId, { shouldValidate: true });
  const setOsm = (updatedOsm) => setValue('osm', updatedOsm, { shouldValidate: true });

  const [defaultPackId] = usePackIdQParam();

  useEffect(() => {
    if (defaultPackId) setPackId(defaultPackId);
  }, [])

  const togglePlace = (isPark, value) => {
    const name = isPark ? 'currentPark' : 'currentTrail';
    const formValues = getValues();
    const newValue = formValues[name] === value ? '' : value;

    reset({ ...formValues, [name]: newValue });
  };

  const [osm] = useGEOLocationSearch();
  const { currentDestination, latLng } = useCurrentDestination();
  const { data: photonDetails } = useGetPhotonDetails({
    properties: {
      osm_id: osm?.osmId,
      osm_type: osm?.osmType,
    },
  });

  useEffect(() => {
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
