import React, { useEffect, useRef, useState, type FC } from 'react';
import { ItemPickerOverlay, List, RListItem, RText } from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';
import { useUserPacks } from 'app/modules/pack/hooks';
import { Backpack, Check } from '@tamagui/lucide-icons';

interface PackPickerOverlayProps {
  isOpen: boolean;
  selectedPackIds?: string[];
  onChange: (packId: string) => void;
  onFirstTimeLoad?: (data: any[]) => void;
  title: string;
  onClose: () => void;
}
export const PackPickerOverlay: FC<PackPickerOverlayProps> = ({
  isOpen,
  title,
  onClose,
  onChange,
  onFirstTimeLoad,
  selectedPackIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const user = useAuthUser();
  const { data: packs } = useUserPacks(user?.id, { searchTerm }, '', true);
  const isLoadedOnce = useRef(false);

  const handleClose = () => {
    onClose();
    setSearchTerm('');
  };

  useEffect(() => {
    if (!isLoadedOnce.current && Array.isArray(packs)) {
      isLoadedOnce.current = true;
      onFirstTimeLoad?.(packs);
    }
  }, [packs, onFirstTimeLoad]);

  return (
    <ItemPickerOverlay
      searchTerm={searchTerm}
      data={packs}
      ListEmptyComponent={() => <RText>No Packs Found</RText>}
      renderItem={({ item }) => {
        const isSelected = selectedPackIds?.includes?.(item.id);
        const handleChange = () => onChange(item.id);

        return (
          <RListItem
            hoverTheme
            icon={isSelected ? Check : Backpack}
            onPress={handleChange}
            title={item.name}
          />
        );
      }}
      onSearchChange={setSearchTerm}
      modalProps={{
        title,
        onClose: handleClose,
        isOpen,
        showTrigger: false,
      }}
    />
  );
};
