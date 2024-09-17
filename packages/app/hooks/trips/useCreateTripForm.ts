import { useCreateTripStore } from 'app/screens/trip/createTripStore';
import { useValidateSchema } from 'app/hooks/common';
import { addTripDetails } from '@packrat/validations/src/validations/';
import { useEffect, useMemo } from 'react';
import { type addTripKey } from 'app/screens/trip/createTripStore/store';
import { useAuthUser } from 'app/modules/auth';
import { usePackId } from 'app/modules/pack';
import { formatCreateTripValuesForAPI } from 'app/utils/tripUtils';

export const useCreateTripForm = (currentDestination, photonDetails) => {
  const { store, setTripValue, setDateRange } = useCreateTripStore();
  const authUser = useAuthUser();
  const [packId] = usePackId();

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

  const createTripFormValues = useMemo<Partial<Record<addTripKey, any>>>(
    () => ({
      ...store,
      destination: currentDestination?.properties?.name,
      owner_id: authUser?.id,
      pack_id: packId,
      geoJSON: photonDetails,
    }),
    [store, packId, photonDetails, authUser?.id],
  );

  useEffect(() => {
    validate(createTripFormValues);
  }, [createTripFormValues, validate]);

  return {
    tripStore: createTripFormValues,
    isValid,
    togglePlace,
    setTripValue,
    setDateRange,
  };
};
