import React, { useState } from 'react';
import {
  RStack as OriginalRStack,
  RText as OriginalRText,
  View,
  XStack,
} from '@packrat/ui';
import { AddPackContainer } from '../../modules/pack/widgets/AddPackContainer';
import PackContainer from '../../modules/pack/widgets/PackContainer';
import { useFetchSinglePack, usePackId } from 'app/modules/pack';
import { LayoutCard } from 'app/components/LayoutCard';

const RStack: any = OriginalRStack;
const RText: any = OriginalRText;

export const GearList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [packId, setPackIdParam] = usePackId();
  const { data: currentPack } = useFetchSinglePack(packId);

  return (
    <>
      <LayoutCard title="Your Pack">
        <XStack style={{ alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <PackContainer />
          </View>
          <AddPackContainer onSuccess={setPackIdParam} isCreatingTrip={true} />
        </XStack>
      </LayoutCard>
    </>
  );
};
