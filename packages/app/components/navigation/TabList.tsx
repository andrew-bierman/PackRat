import { useTabList } from 'app/hooks/navigation';
import { TabItem } from './TabItem';
import { XStack } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';

export const TabList = ({ onItemSelect = () => {} }) => {
  const { tabItems } = useTabList();
  const { currentTheme } = useTheme();

  return (
    <XStack
      style={{
        height: 80,
        backgroundColor: currentTheme.colors.background,
        width: '100%',
        borderWidth: 0.5,
        borderColor: 'gray',
        justifyContent: 'center',
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
