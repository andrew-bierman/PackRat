import { useState } from 'react';

export const useSelect = () => {
  const items = [
    { name: 'Apple' },

    { name: 'Pear' },

    { name: 'Blackberry' },

    { name: 'Peach' },

    { name: 'Apricot' },

    { name: 'Melon' },

    { name: 'Honeydew' },

    { name: 'Starfruit' },

    { name: 'Blueberry' },

    { name: 'Raspberry' },

    { name: 'Strawberry' },

    { name: 'Mango' },

    { name: 'Pineapple' },

    { name: 'Lime' },

    { name: 'Lemon' },

    { name: 'Coconut' },

    { name: 'Guava' },

    { name: 'Papaya' },

    { name: 'Orange' },

    { name: 'Grape' },

    { name: 'Jackfruit' },

    { name: 'Durian' },
  ];
  const [val, setVal] = useState('apple');
  return {
    items,
    val,
    setVal,
  };
};
