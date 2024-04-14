import { useCreateTripStore } from 'app/screens/trip/createTripStore';
import { useValidateSchema } from 'app/hooks/common';
import { format } from 'date-fns';
import { addTripDetails } from '@packrat/validations';
import { useEffect, useMemo } from 'react';
import { type addTripKey } from 'app/screens/trip/createTripStore/store';
import { useAuthUser } from 'app/auth/hooks';
import { usePackId } from 'app/hooks/packs';

export const useCreateTripForm = (
  weather,
  currentDestination,
  photonDetails,
) => {
  const { store, setTripValue, setDateRange } = useCreateTripStore();
  const authUser = useAuthUser();
  const [packId] = usePackId();

  const { isValid, validate } = useValidateSchema(
    addTripDetails,
    formatBeforeValidate,
  );

  const togglePlace = (value: any) => {
    setTripValue('destination', value);
  };

  const createTripFormValues = useMemo<Partial<Record<addTripKey, any>>>(
    () => ({
      ...store,
      weather,
      destination: currentDestination?.properties?.name,
      owner_id: authUser?.id,
      pack_id: packId,
      geoJSON: photonDetails,
    }),
    [store, weather, packId, photonDetails, authUser?.id],
  );

  useEffect(() => {
    validate(createTripFormValues);
  }, [createTripFormValues, validate]);

  console.log({ createTripFormValues });

  return {
    tripStore: createTripFormValues,
    isValid,
    togglePlace,
    setDateRange,
  };
};

const formatBeforeValidate = (values) => ({
  ...values,
  start_date: format(values?.start_date, 'MM/dd/yyyy'),
  end_date: format(values?.end_date, 'MM/dd/yyyy'),
  duration: JSON.stringify(values.duration),
  weather: JSON.stringify(values.weather),
});
