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
  SubmitButton,
  useModalState,
} from '@packrat/ui';

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
  const { downloadMap, isDownloading, progress } = useDownloadMapProgress();
  const { handleDownloadMap, isSaving } = useDownloadMap(downloadMap);
  const formattedProgress = !isNaN(progress) ? Math.round(progress) : 0;

  const handleSubmit = ({ mapName }) => {
    handleDownloadMap({ mapName, bounds: currentBounds.current, shape });
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
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isModalOpen}
        footerButtons={[
          {
            label: 'Cancel',
            color: '#B22222',
            onClick: (_, closeModal) => closeModal(),
          },
        ]}
        footerComponent={undefined}
      >
        <View style={{ paddingVertical: 10, minWidth: 250 }}>
          <Form defaultValues={{ mapName: '' }}>
            <RStack gap={16} direction="vertical">
              <FormInput
                placeholder="Map name"
                name="mapName"
                label="Map name"
              />
              <SubmitButton style={styles.button} onSubmit={handleSubmit}>
                Save
              </SubmitButton>
            </RStack>
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
