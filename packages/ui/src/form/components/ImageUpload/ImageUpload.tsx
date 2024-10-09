import { Ionicons } from '@expo/vector-icons';

import OriginalRStack from '../../../RStack';
import OriginalRH5 from '../../../RH5';
import OriginalRButton from '../../../RButton';
import { useImageUpload } from './useImageUpload';
import { cloneElement } from 'react';
import { View } from 'tamagui';

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;
const RH5: any = OriginalRH5;

export const ImageUpload = ({ previewElement, name, label }) => {
  const { pickImage, removeImage, src } = useImageUpload(name);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {cloneElement(previewElement, { src })}
      <View>
        <RH5 fontWeight="medium">{label}</RH5>
        <View
          style={{ flexDirection: 'row', alignItems: 'flex-end' }}
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
        </View>
      </View>
    </View>
  );
};
