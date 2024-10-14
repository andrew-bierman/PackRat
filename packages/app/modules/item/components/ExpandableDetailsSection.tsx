import React from 'react';
import { Accordion, Paragraph, Square } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Details } from '@packrat/ui';
import { useScreenWidth } from 'app/hooks/common/useScreenWidth';

interface Details {
  key1: string;
  key2: string;
  key3: string;
}

interface ExpandableDetailsSectionProps {
  details: Details;
}

export function ExpandableDetailsSection({
  details,
}: ExpandableDetailsSectionProps) {
  const { screenWidth } = useScreenWidth();

  return (
    <Accordion overflow="hidden" width="100%" type="multiple">
      <Accordion.Item value="details">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({ open }) => (
            <>
              <Paragraph>Product Details</Paragraph>
              <Square rotate={open ? '180deg' : '0deg'} animation="quick">
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="quick">
          <Accordion.Content
            style={{
              width: screenWidth - 50,
              padding: 20,
            }}
          >
            <Details
              items={Object.entries(details).map(([key, value]) => {
                return { key, label: key, value };
              })}
            />
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
}
