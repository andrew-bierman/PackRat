import React, { useContext } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { YStack, XStack } from '..';
import { ListRefContext } from '../../../app/context/ListRef';

interface Props {
  data: any[];
  itemWidth: number;
}

export const VirtualList = ({ data, itemWidth }: Props): React.ReactNode => {
  const ref = useContext(ListRefContext);

  const rowVirtualizer = useVirtualizer({
    horizontal: true,
    count: data.length,
    getScrollElement: () => ref.current,
    estimateSize: () => itemWidth,
    overscan: 5,
  });

  return (
    <XStack flex={1} ref={ref} width={'100px'} height={'100px'}>
      <XStack
        flex={1}
        width={`${rowVirtualizer.getTotalSize()}px`}
        position="relative"
        height={'100%'}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          return (
            <YStack
              key={virtualItem.key}
              data-index={virtualItem.index}
              width={`${itemWidth}px`}
              height="100%"
              position="absolute"
              top={0}
              left={0}
              transform={`translateX(${virtualItem.start}px)`}
            >
              {data[virtualItem.index]}
            </YStack>
          );
        })}
      </XStack>
    </XStack>
  );
};
