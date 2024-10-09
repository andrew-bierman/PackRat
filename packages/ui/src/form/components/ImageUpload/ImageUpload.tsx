import { Ionicons } from '@expo/vector-icons';

import OriginalRStack from '../../../RStack';
import OriginalRH5 from '../../../RH5';
import OriginalRButton from '../../../RButton';
import { useImageUpload } from './useImageUpload';
import { cloneElement } from 'react';
import { Button } from 'tamagui';
import { Upload, Popcorn } from '@tamagui/lucide-icons';

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;
const RH5: any = OriginalRH5;

export const ImageUpload = ({ previewElement, name, label }) => {
  const { pickImage, removeImage, src } = useImageUpload(name);

  return (
    <RStack
      bs="dashed"
      width={400}
      maxWidth="100%"
      height={250}
      borderWidth={1}
      borderColor={'$gray9'}
      padding="$4"
      borderRadius="$3"
      space
      style={{ flexDirection: 'column', alignItems: "center", justifyContent: "center" }}
    >
      <RStack>{cloneElement(previewElement, { src })}</RStack>
      <RStack style={{
        alignItems: 'center',
        justifyContent: "center"
      }} >
        <RH5 fontWeight="medium">{label}</RH5>
        <RStack
          space="$2"
          alignItems="flex-end"
          style={{ flexDirection: 'column' }}
        >
          <RButton
            size="$3"
            type="button"
            icon={
              <Button.Icon>
                <Upload y={0} />
              </Button.Icon>
            }
            color="white"
            size="$3"
            style={{
              backgroundColor: '#232323',
              color: 'white',
              textAlign: 'center'
            }}
            onPress={pickImage}
          >
            Update Profile Picture
          </RButton>
          {/* <RButton
            size="$3"
            type="button"
            icon={
              <Button.Icon>
                <Popcorn y={0} />
              </Button.Icon>
            }
            color="white"
            size="$3"
            style={{
              backgroundColor: '#232323',
              color: 'white',
              textAlign: 'center'
            }}
            onPress={removeImage}
          >
            Remove Profile Picture
          </RButton> */}
          {/* <RButton
            size="$3"
            onPress={removeImage}
            style={{ backgroundColor: 'transparent' }}
          >
            Remove
          </RButton> */}
        </RStack>
      </RStack>
    </RStack>
  );
};
