import { type useOSM } from 'app/hooks/geojson';
import React, { createContext, useContext, type ReactNode } from 'react';
import { type useCurrentTripStore } from 'app/screens/trip/createTripStore/useCreateTripStore';

interface TripContextType {
  tripId?: string;
  // used in edit mode
  tripPack?: [packId: string, setPackId: (packId: string) => void];
  tripOSM?: ReturnType<typeof useOSM>;
  tripStore?: ReturnType<typeof useCurrentTripStore>;
}
const TripContext = createContext<TripContextType>({});

export const TripProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: TripContextType;
}) => {
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTripContext = () => {
  return useContext(TripContext);
};
