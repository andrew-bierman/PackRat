import { useState } from 'react';

const useSummaryCardLogic = () => {
  const [dummyData, setDummyData] = useState([
    'First-aid kit',
    'Water bottles',
    'Tent',
    'Sleeping bags (2x)',
  ]);

  const handleDelete = () => {};

  const handleEdit = () => {};

  return { dummyData, handleDelete, handleEdit };
};

export default useSummaryCardLogic;
