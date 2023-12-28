import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { RStack } from '..';

interface Props {
  data: any[];
  renderItem: (item: any) => React.ReactNode;
  itemHeight: number;
}

export const VirtualList = ({
  data,
  renderItem,
  itemHeight,
}: Props): React.ReactNode => {
  const { top, bottom } = useSafeAreaInsets();

  const parentRef = useRef();
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current as any,
    estimateSize: () => itemHeight,
  });

  return (
    <RStack
      ref={parentRef as any}
      paddingTop={top}
      paddingBottom={bottom}
      height="100%"
      overflow="auto" // Make it scroll!
    >
      {/* The large inner element to hold all of the items */}
      <RStack
        height={`${rowVirtualizer.getTotalSize()}px`}
        width="100%"
        position="relative"
      >
        {/* Only the visible items in the virtualizer, manually positioned to be in view */}
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <RStack
            key={virtualItem.key}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height={`${virtualItem.size}px`}
            transform={`translateY(${virtualItem.start}px)`}
          >
            {renderItem(data[virtualItem.index])}
          </RStack>
        ))}
      </RStack>
    </RStack>
  );
};
