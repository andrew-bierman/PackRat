import { Box } from 'native-base';
import { Text } from 'react-native';
import { ItemRow } from './ItemRow';
import { theme } from '../theme';
import { FontAwesome } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

const dummyData = [
  'First-aid kit',
  'Water bottles',
  'Tent',
  'Sleeping bags (2x)',
];

export default function SummaryCard() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

  const handleDelete = () => {};
  const handleEdit = () => {};

  return (
    <Box
      style={{
        marginVertical: 20,
        width: '35%',
        alignSelf: 'center',

        gap: 10,
      }}
    >
      <Box>
        <Text>Image here</Text>
      </Box>
      <Box style={styles.itemContainer}>
        {dummyData.map((data, id) => (
          <ItemRow key={id} packName={data} />
        ))}
        <FontAwesome
          style={{ padding: 8, alignSelf: 'flex-start' }}
          name="plus-circle"
          size={24}
          color={currentTheme.colors.cardIconColor}
        />
      </Box>
    </Box>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      gap: 10,
    },

    itemContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: currentTheme.colors.card,
      padding: 5,
      justifyContent: 'space-between',
    },
  };
};
