import { useEffect, useState } from 'react';
import { useAuthUserToken } from 'app/modules/auth';

export const useGetObjectUrlFromImageUri = (imageURI: string | null) => {
  const { token } = useAuthUserToken();
  const [imageObjectURL, setImageObjectURL] = useState<string | null>(null);

  useEffect(() => {
    if (!imageURI) {
      return;
    }
    const fetchImage = async () => {
      try {
        const response = await fetch(imageURI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const blob = await response.blob();
          const imgURL = URL.createObjectURL(blob);
          setImageObjectURL(imgURL);
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImage();
  }, [imageURI, token]);

  return imageObjectURL;
};
