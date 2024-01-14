import { createContext, useContext, useEffect, useRef, useState } from 'react';

export const ListRefContext = createContext(useRef(null));

export const ListRefProvider = (props) => {
  const ref = useRef(null);
  return (
    <ListRefContext.Provider value={ref}>
      {props.children}
    </ListRefContext.Provider>
  );
};
