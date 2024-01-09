import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { format, intervalToDuration } from 'date-fns';
import { useAddTrip } from '~/hooks/trips';
import { useGetPhotonDetails } from '~/hooks/destination';

const useSaveTripContainer = ({ dateRange }) => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const weatherObject = useSelector((state) => state.weather.weatherObject);
  const search = useSelector((state) => state.search.selectedSearchResult);
  const dropdown = useSelector((state) => state.dropdown);
  const user = useSelector((state) => state.auth.user);
  const packId = useSelector((state) => state.trips.newTrip.packId);

  // defining dispatch
  const { addTrip, isSuccess, data: response } = useAddTrip();
  const router = useRouter();
  // trip info states value
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // const [numberOfNights, setNumberOfNights] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  const [isPublic, setIsPublic] = useState(true);

  const geoJSONData = useGetPhotonDetails({
    properties: search?.properties
      ? {
          osm_id: search?.properties?.osm_id,
          osm_type: search?.properties?.osm_type,
        }
      : undefined,
  });

  // create trip
  const handleCreateTrip = useCallback(async () => {
    // duration object
    const startDate = dateRange.startDate
      ? format(dateRange.startDate, 'MM/dd/yyyy')
      : '';
    const endDate = dateRange.endDate
      ? format(dateRange.endDate, 'MM/dd/yyyy')
      : '';
    const numNights =
      dateRange.startDate && dateRange.endDate
        ? intervalToDuration({
            start: dateRange.startDate,
            end: dateRange.endDate,
          }).days
        : '';
    const duration = {
      numberOfNights: numNights,
      startDate,
      endDate,
    };

    const { data: geoJSON } = geoJSONData;

    const data = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      destination: search?.properties?.name,
      geoJSON,
      // trail: dropdown.currentTrail,
      duration: JSON.stringify(duration),
      weather: JSON.stringify(weatherObject),
      owner_id: user?._id,
      packs: packId,
      is_public: isPublic,
    };

    // creating a trip
    console.log('create trip data ->', data);
    addTrip(data);
    setIsSaveModalOpen(!isSaveModalOpen);
  }, [
    dateRange,
    geoJSONData,
    name,
    description,
    search,
    weatherObject,
    user,
    packId,
    isPublic,
  ]);

  if (isSuccess && response) {
    router.push(`/trip/${response.trip._id}`);
  }

  return {
    isSaveModalOpen,
    setIsSaveModalOpen,
    weatherObject,
    search,
    dropdown,
    setName,
    setDescription,
    isPublic,
    setIsPublic,
    handleCreateTrip,
  };
}

export default useSaveTripContainer