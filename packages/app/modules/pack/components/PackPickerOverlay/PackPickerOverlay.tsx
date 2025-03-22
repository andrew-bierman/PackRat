import React, { useEffect, useRef, useState, type FC } from 'react';
import { ItemPickerOverlay, List, RListItem, RText } from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';
import { useUserPacks } from 'app/modules/pack/hooks';
import { Backpack, Check } from '@tamagui/lucide-icons';

interface PackPickerOverlayProps {
  isOpen: boolean;
  onChange: (packId: string) => void;
  onFirstTimeLoad?: (data: any[]) => void;
  title: string;
  itemId?: string;
  onClose: () => void;
  saveBtnText?: string;
  onSave?: () => void;
}
export const PackPickerOverlay: FC<PackPickerOverlayProps> = ({
  isOpen,
  title,
  onClose,
  onChange,
  onFirstTimeLoad,
  itemId,
  saveBtnText,
  onSave,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const user = useAuthUser();
  const { data: packs, isLoading } = useUserPacks(
    user?.id,
    { searchTerm, itemId },
    '',
    true,
  );
  const isLoadedOnce = useRef(false);

  const handleClose = () => {
    onClose();
    setSearchTerm('');
  };

  useEffect(() => {
    if (!isLoadedOnce.current && Array.isArray(packs) && !isLoading) {
      isLoadedOnce.current = true;
      onFirstTimeLoad?.(packs);
    }
  }, [packs, onFirstTimeLoad, isLoading]);

  return (
    <ItemPickerOverlay
      title={title}
      searchTerm={searchTerm}
      data={packs}
      ListEmptyComponent={() => <RText>No Packs Found</RText>}
      renderItem={({ item }) => {
        const isSelected = item.hasItem;
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
      saveBtnText={saveBtnText}
      onSave={onSave}
      modalProps={{
        title,
        onClose: handleClose,
        isOpen,
        showTrigger: false,
        children: null,
      }}
    />
  );
};
