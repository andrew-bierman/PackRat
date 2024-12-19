import React from 'react';
import { Accordion, Paragraph, Square } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Details } from '@packrat/ui';
import { useScreenWidth } from 'app/hooks/common/useScreenWidth';

import useResponsive from 'app/hooks/useResponsive';

interface ExpandableDetailsSectionProps {
  title: string;
  data: Array<{ key: string; label: string; value: React.ReactNode }> | string;
  renderContent?: (
    data:
      | Array<{ key: string; label: string; value: React.ReactNode }>
      | string,
  ) => React.ReactNode;
}

export function ExpandableDetailsSection({
  title,
  data,
  renderContent,
}: ExpandableDetailsSectionProps) {
  const { sm, md, lg, xl, xxl } = useResponsive();
  const { screenWidth } = useScreenWidth();

  const getContentStyle = () => {
    if (sm) {
      return {
        width: screenWidth - 110,
      };
    }
    return { width: screenWidth - 1200 };
  };

  return (
    <Accordion overflow="hidden" width="100%" type="multiple">
      <Accordion.Item value="details">
        <Accordion.Trigger
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 0,
            borderBottomWidth: 2,
            marginBottom: 10,
          }}
        >
          {({ open }) => (
            <>
              <Paragraph style={{ fontWeight: 'bold' }}>{title}</Paragraph>
              <Square rotate={open ? '180deg' : '0deg'} animation="quick">
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>

        <Accordion.HeightAnimator animation="quick">
          <Accordion.Content style={getContentStyle()}>
            {renderContent ? (
              renderContent(data)
            ) : typeof data === 'string' ? (
              <Paragraph>{data}</Paragraph>
            ) : (
              <Details items={data} />
            )}
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
}
