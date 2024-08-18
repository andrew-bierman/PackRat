import React, { useState } from 'react';
import { ItemCategoryEnum } from 'app/modules/item/constants';
import { useAddPackItem } from 'app/hooks/packs/useAddPackItem';

export const useWater = ({ currentPack, setWaterItem }) => {
  const [waterWeight, setWaterWeight] = useState(0);
  const { addPackItem } = useAddPackItem();

  /**
   * Update the water weight.
   *
   * @param {type} value - the new value of the water weight
   * @return {undefined} no return value
   */
  const handleWaterChange = (value) => {
    setWaterWeight(value);
  };

  /**
   * Adds water to the pack.
   *
   * @return {void} No return value.
   */
  const addWater = () => {
    const data = {
      name: 'Water',
      weight: waterWeight,
      quantity: 1,
      unit: 'oz',
      packId: currentPack.id,
      type: ItemCategoryEnum.WATER,
      ownerId: currentPack?.ownerId,
    };

    addPackItem(data);
  };

  return { handleWaterChange, addWater, waterWeight };
};
