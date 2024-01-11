import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPackItem } from 'store/packsStore';
import { ItemCategoryEnum } from '~/constants/itemCategory';

export const useWater = ({ currentPack, setWaterItem }) => {
  const [waterWeight, setWaterWeight] = useState(0);
  const dispatch = useDispatch();

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
      quantity: '1',
      unit: 'oz',
      packId: currentPack._id,
      type: ItemCategoryEnum.WATER,
    };

    dispatch(addPackItem(data));
  };

  return { handleWaterChange, addWater, waterWeight };
};
