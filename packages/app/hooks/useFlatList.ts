import { type ReactNode } from 'react';

export const useFlatList = (
  sections: Record<string, string>,
  sectionComponents: Record<string, ReactNode>,
) => {
  const flatListData = Object.entries(sections);
  const keyExtractor = ([key, val]) => val;
  const renderItem = ({ item }) => {
    const sectionKey = item[1];

    console.log({ sectionKey });
    return sectionComponents[sectionKey];
  };

  return { flatListData, keyExtractor, renderItem };
};
