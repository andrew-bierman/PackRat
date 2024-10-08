import { useRef, useState } from 'react';

const MAP_STYLES = [
  { label: 'Outdoors', style: 'mapbox://styles/mapbox/outdoors-v11' },
  { label: 'Street', style: 'mapbox://styles/mapbox/streets-v11' },
  { label: 'Light', style: 'mapbox://styles/mapbox/light-v10' },
  { label: 'Dark', style: 'mapbox://styles/mapbox/dark-v10' },
  { label: 'Satellite', style: 'mapbox://styles/mapbox/satellite-v9' },
  {
    label: 'Satellite Street',
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
  },
];

export const useMapStyles = () => {
  const [selectedStyle, setSelectedStyle] = useState(MAP_STYLES[0].style);

  const onStyleChange = (style: string) => setSelectedStyle(style);

  return { mapStyles: MAP_STYLES, onStyleChange, selectedStyle };
};
