import { useTabList } from 'app/hooks/navigation';
import { TabItem } from './TabItem';
import { XStack as OriginalXStack } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';

const XStack: any = OriginalXStack;

export const TabList = ({ onItemSelect = () => {} }) => {
  const { tabItems } = useTabList();
  const { currentTheme } = useTheme();

  return (
    <XStack
      style={{
        height: 80,
        backgroundColor: currentTheme.colors.primary,
        width: '100%',
        borderWidth: 0.2,
        borderColor: currentTheme.colors.black,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
      space="$2"
      padding="$3"
      alignSelf="center"
    >
      {tabItems?.map((item) => (
        <TabItem item={item} key={item.href} onSelect={onItemSelect} />
      ))}
    </XStack>
  );
};
