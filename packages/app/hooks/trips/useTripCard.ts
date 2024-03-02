import { useForm } from 'react-hook-form';

export const useCardTrip = () => {
  const form = useForm({
    defaultValues: {
      currentPark: '',
      currentTrail: '',
    },
  });
  const { reset, watch, getValues } = form;
  const currentTrail = watch('currentTrail');
  const currentPark = watch('currentPark');

  const togglePlace = (isPark, value) => {
    const name = isPark ? 'currentPark' : 'currentTrail';
    const formValues = getValues();
    const newValue = formValues[name] === value ? '' : value;

    reset({ ...formValues, [name]: newValue });
  };

  return {
    currentTrail,
    currentPark,
    togglePlace,
  };
};
