import React from 'react';
import { View, Platform } from 'react-native';
import { RText, RStack } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import { theme } from '../../theme';
import useCustomStyles from 'app/hooks/useCustomStyles';

/**
 * Retrieves the appropriate container style based on the provided type.
 *
 * @param {string} type - The type of container style to retrieve.
 * @return {Object} The container style object.
 */

interface LargeCardProps {
  title?: string;
  Icon?: React.ComponentType<any>;
  ContentComponent?: React.ComponentType<any>;
  contentProps?: object;
  type?: 'search' | 'map' | 'mobile';
  customStyle?: object;
  children?: React.ReactNode;
}

const getContainerStyle = (type?: 'search' | 'map' | 'mobile') => {
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
 * @param {LargeCardProps}
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
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const containerStyle = customStyle || getContainerStyle(type);

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
            color: currentTheme.colors.text,
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
      height: Platform.OS === 'web' ? 450 : '100%',
    },
    mapCard: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: Platform.OS === 'web' ? '5%' : currentTheme.size.mobilePadding,
      paddingHorizontal: 20,
      marginBottom: 20,
      height: Platform.OS === 'web' ? 'calc(min( 80vh, 80vw))' : '23%',
      minHeight: 350,
      overflow: 'hidden',
    },
  };
};

export default LargeCard;
