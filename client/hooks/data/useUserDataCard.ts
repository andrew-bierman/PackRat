import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePackStatus } from '../../store/packsStore';

const useUserDataCard = (type, _id, is_public, index, differentUser) => {
  const dispatch = useDispatch();
  const [state, setState] = useState([]);

  const updateState = (index, boolState) => {
    let states = state;
    states = states.map((state, iterator) => {
      return iterator === index ? boolState : state;
    });
    setState(states);
  };

  const handleChangeStatus = (index) => {
    updateState(index, true);
    if (type === 'pack') {
      dispatch(changePackStatus({ _id, is_public: !is_public }));
    } else if (type === 'trip') {
    }
  };
  return {
    state,
    setState,
    handleChangeStatus,
  };
};
export default useUserDataCard;
