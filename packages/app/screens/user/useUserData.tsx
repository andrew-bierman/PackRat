import { useState, useEffect } from 'react';

export const useUserData = (user, isLoading) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userRealName, setUserRealName] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (!isLoading && user) {
      setProfileImage(user.profileImage ?? null);
      setUserRealName(user.name ?? null);
      const userEmail = user.email ?? null;
      const userEmailSplitFirstHalf = userEmail?.split('@')[0] ?? null;
      setUsername(
        user.username ? `@${user.username}` : `@${userEmailSplitFirstHalf}`,
      );
    }
  }, [isLoading, user]);

  return { profileImage, userRealName, username };
};
