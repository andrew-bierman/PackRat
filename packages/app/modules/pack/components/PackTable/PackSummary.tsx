import React, { type FC } from 'react';
import { TotalWeightBox, WeightUnitDropdown } from './TableHelperComponents';
import { RSeparator } from '@packrat/ui';
import { type WeightUnit } from 'app/utils/convertWeight';
import { usePackSummary } from 'app/modules/pack/hooks/usePackSummary';

interface PackSummaryProps {
  weightUnit: WeightUnit;
  setWeightUnit: (itemValue: WeightUnit) => void;
  currentPack: any;
}

export const PackSummary: FC<PackSummaryProps> = ({
  currentPack,
  weightUnit,
  setWeightUnit,
}) => {
  const { totalBaseWeight, totalWaterWeight, totalFoodWeight, totalWeight } =
    usePackSummary(currentPack?.items, weightUnit);
  return (
    <>
      <TotalWeightBox
        label="Base Weight"
        weight={totalBaseWeight}
        unit={weightUnit}
      />
      <TotalWeightBox
        label="Water + Food Weight"
        weight={totalWaterWeight + totalFoodWeight}
        unit={weightUnit}
      />
      <RSeparator style={{ marginVertical: 10 }} />
      <TotalWeightBox
        label="Total Weight"
        weight={totalWeight}
        unit={weightUnit}
      />
      <WeightUnitDropdown
        value={weightUnit}
        onChange={(itemValue: string) => setWeightUnit(itemValue as any)}
      />
    </>
  );
};
