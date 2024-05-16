// useMatchesCurrentUser.ts
import { useAuthUser } from 'app/auth/hooks';

export const useMatchesCurrentUser = (ownerId: string): boolean => {
  const currentUser = useAuthUser();

  
  const currentUserId = currentUser?.id;

  

  

  return currentUserId === ownerId; // Note: I adjusted `id` to `id` based on your other code
};
