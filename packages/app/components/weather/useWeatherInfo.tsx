import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { RStack, RText } from '@packrat/ui';
import { loadStyles } from './weatherCard.style';
import useCustomStyles from 'app/hooks/useCustomStyles';
export const useWeatherInfo = (iconName, iconColor, title, value) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <RStack style={styles.weatherInfo}>
      <RStack style={styles.iconsSection}>
        {title == 'PRECIPITATION' ? (
          <FontAwesome5 name={iconName} size={18} color={iconColor} />
        ) : (
          <Feather name={iconName} size={18} color={iconColor} />
        )}
        <RText style={{ color: iconColor, fontWeight: 600 }}>{title}</RText>
      </RStack>
      <RText>{value}</RText>
    </RStack>
  );
};
