import React, { type FC } from 'react';
import { View, type TouchableOpacityProps } from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useDownloadMap } from '../../hooks/useDownloadMap';
import { useDownloadMapProgress } from '../../hooks/useDownloadMapProgress';
import { MapActionBtn } from '../MapActionBtn';
import { Entypo } from '@expo/vector-icons';
import {
  BaseModal,
  Form,
  FormInput,
  RStack,
  RText,
  useFormSubmitTrigger,
  useModalState,
} from '@packrat/ui';
import { mapFormSchema } from '@packrat/validations';

interface MapStylePickerProps {
  currentBounds: any;
  style?: TouchableOpacityProps['style'];
  shape: any;
}

export const DownloadMapBtn: FC<MapStylePickerProps> = ({
  currentBounds,
  style,
  shape,
}) => {
  const styles = useCustomStyles(loadStyles);
  const { isModalOpen, onClose, onOpen } = useModalState();
  const [formRef, triggerSubmit] = useFormSubmitTrigger();

  const { downloadMap, isDownloading, progress } = useDownloadMapProgress();
  const { handleDownloadMap, isSaving } = useDownloadMap(downloadMap);
  const formattedProgress = !isNaN(progress) ? Math.round(progress) : 0;

  const handleSubmit = async (_, { name }) => {
    handleDownloadMap({ mapName: name, bounds: currentBounds.current, shape });
    onClose();
  };

  return (
    <>
      <MapActionBtn style={style} onPress={onOpen}>
        {isDownloading || isSaving ? (
          <RText style={{ color: '#000' }}>{`${formattedProgress}%`}</RText>
        ) : (
          <Entypo name={'download'} size={21} color="grey" />
        )}
      </MapActionBtn>
      <BaseModal
        title="Download"
        showTrigger={false}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isModalOpen}
        footerButtons={[
          {
            label: 'Save',
            color: '#232323',
            onClick: (_, closeModal) => {
              if (typeof triggerSubmit === 'function') {
                triggerSubmit(closeModal);
              }
            },
          },
          {
            label: 'Cancel',
            color: '#B22222',
            onClick: (_, closeModal) => {
              closeModal();
              onClose?.();
            },
          },
        ]}
        footerComponent={undefined}
      >
        <View style={{ paddingVertical: 10, minWidth: 250 }}>
          <Form
            ref={formRef}
            defaultValues={{ mapName: '' }}
            validationSchema={mapFormSchema}
            onSubmit={handleSubmit}
          >
            {/* <RStack gap={16} direction="vertical"> */}
            <RStack gap={16} style={{ flexDirection: 'column' }}>
              <FormInput placeholder="Map name" name="name" label="Map name" />
            </RStack>
            {/* </RStack> */}
          </Form>
        </View>
      </BaseModal>
    </>
  );
};

const loadStyles = () => ({
  downloadIcon: {
    width: 21,
    height: 21,
  },
  downloadText: {
    fontSize: 15,
    fontWeight: '500',
    marginRight: 8,
    color: '#000',
  },
});
