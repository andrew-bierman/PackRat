import { useState } from 'react';
import { useAuthUser } from 'app/modules/auth';

type WeightUnit = 'g' | 'kg' | 'oz' | 'lb' | 'lbs';

export const useItemWeightUnit = (): [
  WeightUnit,
  React.Dispatch<React.SetStateAction<WeightUnit>>,
] => {
  const authUser = useAuthUser();

  const userPreferWeight = authUser
    ? (authUser.preferredWeight as WeightUnit | null)
    : null;

  const [weightUnit, setWeightUnit] = useState<WeightUnit>(
    userPreferWeight || 'kg',
  );

  return [weightUnit, setWeightUnit];
};
