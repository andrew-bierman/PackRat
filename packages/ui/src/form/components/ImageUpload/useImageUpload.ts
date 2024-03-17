import * as ImagePicker from 'expo-image-picker';
import { useFormContext } from 'react-hook-form';

export const useImageUpload = (name) => {
  const { setValue, watch } = useFormContext();
  const src = watch(name);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setValue(name, result.assets?.[0]?.uri);
    }
  };

  const removeImage = () => setValue(name, null);

  return { src, pickImage, removeImage };
};
