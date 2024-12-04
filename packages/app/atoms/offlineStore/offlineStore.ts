import { atom, useAtom } from 'jotai';

export type ConnectionStatus = 'pending' | 'connected' | 'offline';

const requestsAtom = atom([]);
const connectionStatusAtom = atom<ConnectionStatus>('pending');

export const useOfflineStore = () => {
  const [requests, setRequests] = useAtom(requestsAtom);
  const [connectionStatus, setConnectionStatus] = useAtom(connectionStatusAtom);

  return { requests, setRequests, connectionStatus, setConnectionStatus };
};
