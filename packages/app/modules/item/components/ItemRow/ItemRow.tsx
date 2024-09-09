import { Container } from 'native-base';
import { RText, RStack } from '@packrat/ui';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useItemRow } from 'app/hooks/itemrow';

interface ItemRowProps {
  packName: string;
}

export const ItemRow: React.FC<ItemRowProps> = ({ packName }) => {
  const { isChecked, handleChange } = useItemRow();
  const styles = useCustomStyles(loadStyles);

  return (
    <Container style={styles.mainContainer}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={handleChange}
      />
      <RText
        style={{
          flex: 1,
          // textDecoration: isChecked ? "line-through" : "",
          color: isChecked ? '#e2e8f0' : 'black',
        }}
      >
        {packName}
      </RText>
      <RStack style={styles.icons}>
        <FontAwesome name="dot-circle-o" size={24} color="black" />
        <FontAwesome name="pencil" size={24} color="black" />
        <FontAwesome name="trash" size={24} color="black" />
      </RStack>
    </Container>
  );
};

const loadStyles = () => ({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
  },

  icons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    cursor: 'pointer',
  },

  checkbox: {
    margin: 8,
    cursor: 'pointer',
  },
});
