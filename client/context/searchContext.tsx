import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  searchString: '',
  selectedSearchResult: {},
};

const SearchContext = createContext();

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_STRING':
      return { ...state, searchString: action.payload };
    case 'SET_SELECTED_SEARCH_RESULT':
      return { ...state, selectedSearchResult: action.payload };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};