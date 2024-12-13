import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View } from 'react-native';
import { AddItemModal } from 'app/modules/item';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useAuthUser } from 'app/modules/auth';
import {
  usePackId,
  useUserPacks,
  PackPickerOverlay,
  useFetchSinglePack,
} from 'app/modules/pack';
import {
  DropdownComponent,
  RButton,
  RListItem,
  RStack,
  useModalState,
} from '@packrat/ui';
import { Spinner } from 'tamagui';
import useTheme from 'app/hooks/useTheme';
import { TableContainerComponent } from 'app/screens/trip/TripDetailsComponents';
import { Backpack, Edit3 } from '@tamagui/lucide-icons';

export default function PackContainer() {
  const [packIdParam, setPackIdParam] = usePackId();
  const { isModalOpen, onClose, onOpen } = useModalState();
  const { data: currentPack } = useFetchSinglePack(packIdParam);
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
