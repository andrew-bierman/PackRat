import React, { useCallback } from 'react';
import { View } from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { PackPickerOverlay, useFetchSinglePack } from 'app/modules/pack';
import { RListItem, useModalState } from '@packrat/ui';
import { Backpack, Edit3 } from '@tamagui/lucide-icons';
import { useTripPackId } from 'app/screens/trip/useTripPackId';

interface PackContainerProps {
  emptyStateComponent?: React.ReactNode;
}
export default function PackContainer({
  emptyStateComponent: EmptyStateComponent,
}: PackContainerProps) {
  const [packIdParam, setPackIdParam] = useTripPackId();
  const { isModalOpen, onClose, onOpen } = useModalState();
  const { data: currentPack, isLoading } = useFetchSinglePack(packIdParam);
  const styles = useCustomStyles(loadStyles);

  const onSelectPack = (packId: string) => {
    onClose();
    setPackIdParam(packId);
  };

  const onFirstTimeLoad = useCallback(
    (packs: any[]) => {
      const firstPackId = packs?.[0]?.id;
      if (!packIdParam && firstPackId) {
        setPackIdParam(firstPackId);
      }
    },
    [packIdParam],
  );

  return (
    <View style={styles.mainContainer}>
      <PackPickerOverlay
        isOpen={isModalOpen}
        onChange={onSelectPack}
        onFirstTimeLoad={onFirstTimeLoad}
        onClose={onClose}
        title="Select Pack"
      />
      {currentPack ? (
        <RListItem
          icon={Backpack}
          bordered
          hoverTheme
          onPress={onOpen}
          style={{ maxWidth: 652 }}
          iconAfter={Edit3}
        >
          {currentPack?.name}
        </RListItem>
      ) : null}
      {!isLoading && !currentPack && EmptyStateComponent}
    </View>
  );
}

const loadStyles = () => ({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
});
