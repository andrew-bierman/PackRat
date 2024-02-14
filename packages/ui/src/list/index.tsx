import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback } from 'react';

interface Props<TItem> extends FlashListProps<TItem> {
  data: any[];
  renderItem: (item: any) => React.ReactElement;
  itemHeight: number;
  ListHeaderComponent: React.ReactElement;
}

export function VirtualList<TItem>({
  data,
  renderItem,
  itemHeight,
  ...flashListProps
}: Props<TItem>): React.ReactNode {
  const { top, bottom } = useSafeAreaInsets();

  // FlashList's API is awkward.
  const render = useCallback(
    (item) => {
      console.log('item.item ', item.item);
      return renderItem(item.item);
    },
    [renderItem],
  );

  return (
    <FlashList
      data={data}
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
      renderItem={render}
      estimatedItemSize={itemHeight}
      {...flashListProps}
    />
  );
}
