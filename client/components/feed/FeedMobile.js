import { Container, Box, Text, HStack, Stack, FlatList } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { useAuth } from '../../auth/provider';
import CardMobile from './CardMobile';
import useGetPublicPacks from '../../hooks/useGetPublicPacks';
import { theme } from '../../theme';
import DropdownComponent from '../Dropdown';
import { useState } from 'react';

const windowHeight = Dimensions.get('window').height;
const dataValues = ['Favorite', 'Most Recent'];

export default function FeedMobile() {
  const [queryString, setQueryString] = useState('');

  const { data, isLoading, isError, error } = useGetPublicPacks(queryString);

  return (
    <Box style={styles.mainContainer}>
      <DropdownComponent
        value={queryString}
        data={dataValues}
        setUnit={setQueryString}
        style={styles.dropdown}
      />

      <FlatList
        data={data}
        keyExtractor={(pack) => pack?._id}
        renderItem={({ item: pack }) => <CardMobile {...pack} />}
        ListEmptyComponent={<Text>No Public Packs Available</Text>}
        contentContainerStyle={styles.packsContainer}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flexDirection: 'column',
    gap: 15,
    padding: 15,
    fontSize: 18,
    width: '100%',
  },
  packsContainer: {
    flexDirection: 'column',
    minHeight: 100,
    padding: 25,
    fontSize: 26,
  },
  dropdown: {
    backgroundColor: 'white',
  },
});
