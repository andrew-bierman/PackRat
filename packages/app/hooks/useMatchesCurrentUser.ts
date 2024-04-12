// useMatchesCurrentUser.ts
import { useAuthUser } from 'app/auth/hooks';

export const useMatchesCurrentUser = (ownerId: string): boolean => {
  const currentUser = useAuthUser();

  console.log('currentUse---r', currentUser);
  const currentUserId = currentUser?.id;

  console.log('currentUserId', currentUserId);

  console.log('ownerId', ownerId);

  return currentUserId === ownerId; // Note: I adjusted `id` to `id` based on your other code
};
