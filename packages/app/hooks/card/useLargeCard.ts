import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { useSelector } from 'react-redux';

export const useLargeCard = ({ customStyle, type, loadStyles }) => {
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
  const currentShape = useSelector(
    (state) => state.search.selectedSearchResult,
  );
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const containerStyle = customStyle || getContainerStyle(type);

  return {
    containerStyle,
    currentShape,
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme,
  };
};
