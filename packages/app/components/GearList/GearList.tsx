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
import { PackSummary } from 'app/modules/pack/components/PackTable/PackSummary';
import { type WeightUnit } from 'app/utils/convertWeight';
import { ChevronDown } from '@tamagui/lucide-icons';
import { AsyncView } from 'app/components/AsyncView';

const RStack: any = OriginalRStack;
const RText: any = OriginalRText;

export const GearList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [packId, setPackIdParam] = usePackId();
  const { data: currentPack, isLoading, isError } = useFetchSinglePack(packId);

  return (
    <>
      <LayoutCard title="Your Pack">
        <YStack style={{ gap: 16 }}>
          <AsyncView isLoading={packId && isLoading} isError={isError}>
            <RStack
              style={{
                alignItems: currentPack ? 'center' : 'flex-start',
                gap: 16,
                flexDirection: currentPack ? 'row' : 'column',
              }}
            >
              <View style={{ flex: 1 }}>
                {currentPack ? (
                  <PackContainer />
                ) : (
                  <RText>
                    Add packs to plan your trip essentials and stay prepared for
                    any adventure!
                  </RText>
                )}
              </View>
              <AddPackContainer
                onSuccess={setPackIdParam}
                isCreatingTrip={true}
              />
            </RStack>
            {currentPack ? (
              <>
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
                  <Accordion.Item value="details" style={{ width: '100%' }}>
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
                          <Square
                            rotate={open ? '180deg' : '0deg'}
                            animation="quick"
                          >
                            <ChevronDown size={24} />
                          </Square>
                        </>
                      )}
                    </Accordion.Trigger>
                    <Accordion.Content
                      style={{
                        width: '100%',
                        flex: 1,
                        flexShrink: 0,
                      }}
                    >
                      <TableContainerComponent
                        hideSummary
                        forceCardLayout
                        currentPack={currentPack}
                      />
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </>
            ) : null}
          </AsyncView>
        </YStack>
      </LayoutCard>
    </>
  );
};
