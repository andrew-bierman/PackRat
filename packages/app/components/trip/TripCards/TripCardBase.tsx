import React, { ReactNode } from 'react';
import { RStack as OriginalRStack, RText as OriginalRText } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { LayoutCard } from 'app/components/LayoutCard';

const RStack: any = OriginalRStack;
const RText: any = OriginalRText;

type TripCardBaseProps = {
  loadStyles?: (theme: any) => any;
  flexDirection?: 'row' | 'column';
  children: ReactNode;
  icon: React.FC;
  title: string;
};
export const TripCardBase = ({
  loadStyles = loadStylesBase,
  flexDirection = 'row',
  children,
  icon: Icon,
  title,
}: TripCardBaseProps) => {
  return <LayoutCard>{children}</LayoutCard>;
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
    gap: 25,
    flex: 1,
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
