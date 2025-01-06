import { useCreateTripStore } from 'app/screens/trip/createTripStore';
import { useValidateSchema } from 'app/hooks/common';
import { addTripDetails } from '@packrat/validations/src/validations/';
import { useEffect, useMemo } from 'react';
import { type addTripKey } from 'app/screens/trip/createTripStore/store';
import { useAuthUser } from 'app/modules/auth';
import { usePackId } from 'app/modules/pack';
import { formatCreateTripValuesForAPI } from 'app/utils/tripUtils';
import { useCurrentTripStore } from 'app/screens/trip/createTripStore/useCreateTripStore';
import { useTripPackId } from 'app/screens/trip/useTripPackId';

export const useCreateTripForm = (currentDestination, photonDetails) => {
  const { store, setTripValue, setDateRange } = useCurrentTripStore();
  const authUser = useAuthUser();
  const [packId] = useTripPackId();

  const { isValid, validate } = useValidateSchema(
    addTripDetails,
    formatCreateTripValuesForAPI,
  );

  const togglePlace = (name: 'trails' | 'parks', value: any) => {
    const currentPlaces = store[name] || [];

    const placeExists = currentPlaces.some((place) => place.id === value.id);

    const updatedPlaces = placeExists
      ? currentPlaces.filter((place) => place.id !== value.id)
      : [...currentPlaces, value];

    setTripValue(name, updatedPlaces);
  };

  const createTripFormValues = useMemo<Partial<Record<addTripKey, any>>>(() => {
    const res = {
      ...store,
      owner_id: authUser?.id,
      pack_id: packId,
    };
    if (photonDetails) {
      res.geoJSON = photonDetails;
      res.destination = currentDestination?.properties?.name;
    }

    return res;
  }, [store, packId, photonDetails, authUser?.id]);

  useEffect(() => {
    validate(createTripFormValues);
  }, [createTripFormValues, validate]);

  const dateRange = {
    start_date: createTripFormValues.start_date,
    end_date: createTripFormValues.end_date,
  };

  return {
    tripStore: createTripFormValues,
    isValid,
    togglePlace,
    setTripValue,
    dateRange,
    setDateRange,
  };
};
