import React from 'react';
import { View, Platform, ViewStyle, TextStyle } from 'react-native';
import { RText, RStack, Theme } from '@packrat/ui';
import { useSelector } from 'react-redux';
import useTheme from '../../hooks/useTheme'; // Import Theme type if available
import useCustomStyles from '~/hooks/useCustomStyles';

// Define the type for the container styles
interface ContainerStyles {
  mutualStyles: ViewStyle;
  containerMobile: ViewStyle;
  searchContainer: ViewStyle;
  mapCard: ViewStyle;
}

// Define the type for the LargeCard props
interface LargeCardProps {
  title?: string;
  Icon?: React.ComponentType<any>;
  ContentComponent?: React.ComponentType<any>;
  contentProps?: any;
  type: 'search' | 'map' | 'mobile';
  customStyle?: ViewStyle;
  children?: React.ReactNode;
}

// Retrieve the appropriate container style based on the provided type
const getContainerStyle = (type: LargeCardProps['type'], styles: ContainerStyles) => {
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

// Define the type for the styles loaded by the loadStyles function
interface LoadedStyles {
  backgroundColor: string;
  flex?: number;
  gap?: number;
  justifyContent?: 'space-between';
  alignItems?: 'center';
  textAlign?: 'center';
  padding: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  flexDirection?: 'column';
  marginBottom?: number;
  height?: number | string;
  overflow?: 'hidden';
}

// Define the type for the loadStyles function
type LoadStylesFunction = (theme: Theme) => ContainerStyles;

// Define the LargeCard component
export default function LargeCard({
  title,
  Icon,
  ContentComponent,
  contentProps,
  type,
  customStyle,
  children,
}: LargeCardProps) {
  const currentShape = useSelector((state) => state.search.selectedSearchResult);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const containerStyles: ContainerStyles = useCustomStyles(loadStyles);

  // Retrieve the appropriate container style based on the provided type
  const containerStyle = customStyle || getContainerStyle(type, containerStyles);

  return (
    <RStack
      style={{
        alignSelf: 'center',
        width: '90%',
        borderRadius: 8,
        ...containerStyle,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          paddingVertical: 15,
        }}
      >
        {Icon ? <Icon /> : null}
        <RText
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            fontWeight: 600,
          }}
        >
          {title && <RText>{title}</RText>}
        </RText>
      </View>
      {ContentComponent ? <ContentComponent {...contentProps} /> : null}
      {children}
    </RStack>
  );
}

// Define the loadStyles function with appropriate types
const loadStyles: LoadStylesFunction = (theme) => {
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
      height: Platform.OS === 'web' ? 450 : '100%',
    },
    mapCard: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: currentTheme.size.cardPadding,
      paddingHorizontal: currentTheme.padding.paddingInside,
      marginBottom: 20,
      height: Platform.OS === 'web' ? 650 : '100%',
      overflow: 'hidden',
    },
  };
};
