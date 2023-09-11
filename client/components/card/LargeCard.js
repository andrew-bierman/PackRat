import React from 'react';
import { Box, Text, Stack } from 'native-base';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import useTheme from '../../hooks/useTheme';

import { theme } from '../../theme';
import useCustomStyles from '~/hooks/useCustomStyles';

/**
 * Retrieves the appropriate container style based on the provided type.
 *
 * @param {string} type - The type of container style to retrieve.
 * @return {Object} The container style object.
 */
const getContainerStyle = (type) => {
  const styles = useCustomStyles(loadStyles);
  switch (type) {
    case 'search':
      return styles.searchContainer;
    case 'map':
      return styles.mapCard;
    case 'mobile':
      return styles.containerMobile;
    default:
      return styles.mutualStyles;
  }
};

/**
 * Generate the function comment for the given function body.
 *
 * @param {Object} props - The props object containing the function parameters.
 * @param {string} props.title - The title of the large card.
 * @param {React.Component} props.Icon - The icon component of the large card.
 * @param {React.Component} props.ContentComponent - The content component of the large card.
 * @param {Object} props.contentProps - The props object for the content component.
 * @param {string} props.type - The type of the large card.
 * @param {Object} props.customStyle - The custom style object for the large card.
 * @param {React.Component} props.children - The children components of the large card.
 * @return {React.Component} The rendered large card component.
 */
export default function LargeCard({
  title,
  Icon,
  ContentComponent,
  contentProps,
  type,
  customStyle,
  children,
}) {
  const currentShape = useSelector(
    (state) => state.search.selectedSearchResult,
  );

  console.log('currentShape', currentShape);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const containerStyle = customStyle || getContainerStyle(type);

  return (
    <Stack
      alignSelf="center"
      w={['100%', '100%', '100%', '90%']}
      direction={['column', 'column', 'row', 'row']}
      rounded={['none', 'none', 'md', 'lg']}
      style={containerStyle}
    >
      <Box
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          paddingVertical: 15,
        }}
      >
        {Icon ? <Icon /> : null}
        <Text
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            fontWeight: 600,
          }}
        >
          {title && <Text>{title}</Text>}
        </Text>
      </Box>
      {ContentComponent ? <ContentComponent {...contentProps} /> : null}
      {children}
    </Stack>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    mutualStyles: {
      backgroundColor: currentTheme.colors.card,
      flex: 1,
      gap: 45,
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      padding: currentTheme.size.cardPadding,
    },
    containerMobile: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 25,
      flex: 1,
      paddingHorizontal: 100,
    },
    searchContainer: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      flex: 1,
      paddingHorizontal: 60,
      paddingVertical: 70,
      height: Platform.OS === 'web' ? '450px' : '100%',
    },
    mapCard: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: currentTheme.size.cardPadding,
      paddingHorizontal: currentTheme.padding.paddingInside,
      marginBottom: 20,
      height: Platform.OS === 'web' ? '650px' : '100%',
      overflow: 'hidden',
    },
  };
};
