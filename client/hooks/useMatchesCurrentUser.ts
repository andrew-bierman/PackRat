// useMatchesCurrentUser.ts
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';

export const useMatchesCurrentUser = (ownerId: string): boolean => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const currentUserId = currentUser?._id;

  return currentUserId === ownerId; // Note: I adjusted `id` to `_id` based on your other code
};
