// useMatchesCurrentUser.ts
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';

export const useMatchesCurrentUser = (ownerId: string): boolean => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  console.log('currentUse---r', currentUser);
  const currentUserId = currentUser?.id;

  console.log('currentUserId', currentUserId);

  console.log('ownerId', ownerId);

  return currentUserId === ownerId; // Note: I adjusted `_id` to `id` based on your other code
};
