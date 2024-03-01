import { Ionicons } from '@expo/vector-icons';

import RStack from '../../../RStack';
import RH5 from '../../../RH5';
import RButton from '../../../RButton';
import { useImageUpload } from './useImageUpload';
import { cloneElement } from 'react';

export const ImageUpload = ({ previewElement, name, label }) => {
  const { pickImage, removeImage, src } = useImageUpload(name);

  return (
    <RStack alignItems="center" space style={{ flexDirection: 'row' }}>
      {cloneElement(previewElement, { src })}
      <RStack space="$2">
        <RH5 fontWeight="medium">{label}</RH5>
        <RStack
          space="$2"
          alignItems="flex-end"
          style={{ flexDirection: 'row' }}
        >
          <RButton
            size="$3"
            type="button"
            icon={<Ionicons name="cloud-upload-outline" size={24} />}
            color="white"
            style={{ backgroundColor: '#0284c7' }}
            onPress={pickImage}
          >
            Upload
          </RButton>
          <RButton
            size="$3"
            onPress={removeImage}
            style={{ backgroundColor: 'transparent' }}
          >
            Remove
          </RButton>
        </RStack>
      </RStack>
    </RStack>
  );
};
