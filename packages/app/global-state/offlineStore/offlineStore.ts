import { atom, useAtom } from 'jotai';

const requestsAtom = atom([]);
const isConnectedAtom = atom(true);

export const useOfflineStore = () => {
  const [requests, setRequests] = useAtom(requestsAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);

  return { requests, setRequests, isConnected, setIsConnected };
};
