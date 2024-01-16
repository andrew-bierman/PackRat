import React from 'react';
import { Box, Text, Stack } from 'native-base';
import { RText } from '@packrat/ui';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import useTheme from '../../hooks/useTheme';

import { theme } from '../../theme';
import useCustomStyles from '~/hooks/useCustomStyles';

interface LargeCardProps {
  title: string;
  Icon?: React.ComponentType<any>;
  ContentComponent?: React.ComponentType<any>;
  contentProps?: object;
  type: 'search' | 'map' | 'mobile';
  customStyle?: object;
  children?: React.ReactNode;
}

/**
 * Retrieves the appropriate container style based on the provided type.
 *
 * @param {string} type - The type of container style to retrieve.
 * @return {Object} The container style object.
 */
const getContainerStyle = (type: 'search' | 'map' | 'mobile') => {
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
 * @param {LargeCardProps} props - The props object containing the function parameters.
 * @return {React.Component} The rendered large card component.
 */
const LargeCard: React.FC<LargeCardProps> = ({
  title,
  Icon,
  ContentComponent,
  contentProps,
  type,
  customStyle,
  children,
}) => {
  const currentShape = useSelector(
    (state) => state.search.selectedSearchResult,
  );

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
        <RText style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            fontWeight: 600,
          }}
        >
          {title && <Text>{title}</Text>}
        </RText>
      </Box>
      {ContentComponent ? <ContentComponent {...contentProps} /> : null}
      {children}
    </Stack>
  );
};

const loadStyles = (theme: any) => {
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

export default LargeCard;
