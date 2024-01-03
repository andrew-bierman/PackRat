import { useRouter } from 'expo-router';
import { useState } from 'react';

const URL_PATHS = {
  userPacks: '/pack/',
  favoritePacks: '/pack/',
  userTrips: '/trip/',
};

export const useFeedLogic = (feedType) => {
  const urlPath = URL_PATHS[feedType];
  const createUrlPath = URL_PATHS[feedType] + 'create';
  const router = useRouter();

  const [queryString, setQueryString] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });

  const handleTogglePack = () => {
    setSelectedTypes((prevState) => ({
      ...prevState,
      pack: !prevState.pack,
    }));
  };

  const handleToggleTrip = () => {
    setSelectedTypes((prevState) => ({
      ...prevState,
      trip: !prevState.trip,
    }));
  };

  const handleSortChange = (value) => {
    setQueryString(value);
  };

  const handleCreateClick = () => {
    router.push(createUrlPath);
  };

  return {
    handleTogglePack,
    handleToggleTrip,
    handleSortChange,
    handleCreateClick,
  };
};
