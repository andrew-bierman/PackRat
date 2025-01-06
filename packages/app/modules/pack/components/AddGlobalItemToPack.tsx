import { BaseModal, RButton, View } from '@packrat/ui';
import { SearchItem } from 'app/modules/item';
import { useEffect, useState } from 'react';
import { Input } from 'tamagui';
import { usePackId } from '../hooks';
import { useAddGlobalItemToPack } from 'app/modules/pack/hooks';
import { useAuthUser } from 'app/modules/auth';
import { type Item } from '../../item/model';

export const AddGlobalItemToPack = () => {
  const [item, setItem] = useState<Item | null>(null); // Update the type of item
  const [quantity, setQuantity] = useState<string>();

  const [showAddQuantityModal, setShowAddQuantityModal] = useState(false);

  const closeAddQuantityModal = () => setShowAddQuantityModal(false);

  const { isLoading, addGlobalItemToPack } = useAddGlobalItemToPack({
    onSuccess: closeAddQuantityModal,
    onError: closeAddQuantityModal,
  });

  const user = useAuthUser();
  const [packId] = usePackId();

  const handleItemSelect = (item: Item) => {
    setItem(item);
    setShowAddQuantityModal(true);
  };

  return (
    <>
      <View
        style={
          {
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 16,
            paddingLeft: 16,
            position: 'relative',
            zIndex: 1,
          } as any
        }
      >
        <SearchItem onSelect={handleItemSelect} />
      </View>

      <BaseModal
        title={item?.name || ''}
        isOpen={showAddQuantityModal}
        onClose={() => setShowAddQuantityModal(false)}
        showTrigger={false}
      >
        <View>
          <Input
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Quantity"
            keyboardType="numeric"
            mb="$4"
            style={{ width: '100%' }}
          />
          <RButton
            disabled={isLoading}
            onPress={() =>
              item &&
              addGlobalItemToPack({
                itemId: item.id,
                packId,
                ownerId: user.id,
                quantity: Number(quantity),
              })
            }
          >
            {isLoading ? 'Adding...' : 'Add Item'}
          </RButton>
        </View>
      </BaseModal>
    </>
  );
};
