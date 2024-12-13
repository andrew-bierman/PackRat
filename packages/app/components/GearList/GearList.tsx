import React, { useState } from 'react';
import {
  RStack as OriginalRStack,
  RText as OriginalRText,
  View,
  XStack,
  YStack,
} from '@packrat/ui';
import { AddPackContainer } from '../../modules/pack/widgets/AddPackContainer';
import PackContainer from '../../modules/pack/widgets/PackContainer';
import { useFetchSinglePack, usePackId } from 'app/modules/pack';
import { LayoutCard } from 'app/components/LayoutCard';
import { TableContainerComponent } from 'app/screens/trip/TripDetailsComponents';
import { Accordion, Paragraph, Square } from 'tamagui';
import { ChevronDown } from 'lucide-react-native';
import { PackSummary } from 'app/modules/pack/components/PackTable/PackSummary';
import { type WeightUnit } from 'app/utils/convertWeight';

const RStack: any = OriginalRStack;
const RText: any = OriginalRText;

export const GearList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [packId, setPackIdParam] = usePackId();
  const { data: currentPack } = useFetchSinglePack(packId);

  return (
    <>
      <LayoutCard title="Your Pack">
        <YStack style={{ gap: 16 }}>
          <XStack style={{ alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <PackContainer />
            </View>
            <AddPackContainer
              onSuccess={setPackIdParam}
              isCreatingTrip={true}
            />
          </XStack>
          <LayoutCard>
            <PackSummary
              currentPack={currentPack}
              setWeightUnit={setWeightUnit}
              weightUnit={weightUnit}
            />
          </LayoutCard>
          <Accordion
            style={{ overflow: 'hidden', width: '100%' }}
            type="multiple"
          >
            <Accordion.Item value="details">
              <Accordion.Trigger
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {({ open }) => (
                  <>
                    <Paragraph style={{ fontWeight: 600 }}>
                      Manage Pack
                    </Paragraph>
                    <Square rotate={open ? '180deg' : '0deg'} animation="quick">
                      <ChevronDown size={24} />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>
              <Accordion.HeightAnimator animation="quick">
                <Accordion.Content
                  style={{
                    padding: 20,
                  }}
                >
                  <TableContainerComponent
                    hideSummary
                    currentPack={currentPack}
                  />
                </Accordion.Content>
              </Accordion.HeightAnimator>
            </Accordion.Item>
          </Accordion>
        </YStack>
      </LayoutCard>
    </>
  );
};
