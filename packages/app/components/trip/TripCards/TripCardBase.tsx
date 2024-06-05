import React, { type ReactNode } from 'react';
import { RStack, RText } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';

interface TripCardBaseProps {
  loadStyles?: (theme: any) => any;
  flexDirection?: 'row' | 'column';
  children: ReactNode;
  icon: React.FC;
  title: string;
}
export const TripCardBase = ({
  loadStyles = loadStylesBase,
  flexDirection = 'row',
  children,
  icon: Icon,
  title,
}: TripCardBaseProps) => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadTripCardStyles(loadStyles));

  return (
    <RStack
      $sm={{
        borderRadius: 6,
        flexDirection: 'column',
        width: '100%',
      }}
      $gtSm={{
        borderRadius: 12,
        flexDirection,
        width: '90%',
      }}
      style={styles.styles}
    >
      <RStack
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          paddingVertical: 15,
        }}
      >
        <RStack
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            paddingVertical: 15,
          }}
        >
          <Icon />
          <RText
            style={{
              color: currentTheme.colors.textPrimary,
              fontSize: currentTheme.font.size,
              fontWeight: 600,
            }}
            fontFamily="$body"
          >
            {title}
          </RText>
        </RStack>
      </RStack>
      {children}
    </RStack>
  );
};

const loadTripCardStyles = (loader) => (theme) => ({
  styles: loader.apply(null, [theme]),
});

const loadStylesBase = ({ currentTheme }) => {
  return {
    backgroundColor: currentTheme.colors.card,
    padding: currentTheme.size.mobilePadding,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  };
};

/**
 isSearch
          ? styles.searchContainer
          : isMap
            ? styles.mapCard
            : styles.containerMobile
              ? styles.containerMobile
              : styles.mutualStyles
 */

/*
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
      alignSelf: 'center',
    },
    containerMobile: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 25,
      flex: 1,
      paddingHorizontal: 100,
      alignSelf: 'center',
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
      alignSelf: 'center',
    },
    mapCard: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: currentTheme.size.cardPadding,
      paddingHorizontal: currentTheme.padding.paddingInside,
      marginBottom: 20,
      overflow: 'hidden',
      alignSelf: 'center',
    },
  };
};

*/
