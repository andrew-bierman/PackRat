import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Colors from 'themes/Colors';
import { globalStyle } from 'utils/globalStyle';
import Touchable from './Touchable';
import Text from './Text';

const Button = ({
  center,
  primary,
  secondary,
  transparent,
  style,
  disabled,
  icon,
  ionicons,
  iconColor,
  iconSize,
  iconStyle,
  fontAwesome,
  textStyle,
  buttonTitle,
  subTitle,
  loading,
  onPress,
  isShadow,
  wrapperStyle,
  iconRight,
  customIconRight,
  children,
}) => {
  const innerView = (
    <View
      style={[
        styles.buttonWithText,
        center && styles.center,
        primary && { backgroundColor: Colors.primary },
        secondary && { backgroundColor: Colors.secondary },
        transparent && { backgroundColor: Colors.transparent },
        isShadow && styles.shadow,
        style,
        disabled && styles.disabledBtt,
      ]}
    >
      {icon ? (
        <FontAwesome
          name={icon}
          color={iconColor || Colors.default}
          size={iconSize || 20}
          style={[styles.iconLeft, iconStyle]}
        />
      ) : null}
      {ionicons ? (
        <Ionicons
          name={ionicons}
          color={iconColor || Colors.default}
          size={iconSize || 20}
          style={[styles.iconLeft, iconStyle]}
        />
      ) : null}
      {fontAwesome ? (
        <FontAwesome
          name={fontAwesome}
          color={iconColor || Colors.default}
          size={iconSize || 20}
          style={[styles.iconLeft, iconStyle]}
        />
      ) : null}

      <Text
        type="button"
        style={[
          styles.buttonText,
          (secondary || primary) && !transparent && { color: Colors.default },
          textStyle,
          disabled && { color: `${Colors.default}60` },
        ]}
      >
        {buttonTitle}
        {subTitle && (
          <Text
            type="body1"
            style={[
              styles.buttonText,
              (secondary || primary) &&
                !transparent && { color: Colors.default },
              textStyle,
              disabled && { color: `${Colors.default}60` },
            ]}
          >
            {`\n${subTitle}`}
          </Text>
        )}
      </Text>
      {iconRight ? (
        <Ionicons
          name={iconRight}
          color={iconColor || Colors.default}
          size={iconSize || 20}
          style={[styles.iconRight, { textAlign: 'right' }, iconStyle]}
        />
      ) : null}
      {!!customIconRight && (
        <Icon
          name={customIconRight}
          color={iconColor || Colors.default}
          size={iconSize || 20}
          style={[styles.iconRight, { textAlign: 'right' }, iconStyle]}
        />
      )}
      <View style={globalStyle.row}>
        {loading && <ActivityIndicator color="white" />}
        {children}
      </View>
    </View>
  );
  if (loading || disabled) {
    return innerView;
  }
  return (
    <Touchable
      style={[isShadow && styles.shadow, wrapperStyle]}
      onPress={onPress}
    >
      {innerView}
    </Touchable>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  center: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.any,
  icon: PropTypes.string,
  ionicons: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.any,
  fontAwesome: PropTypes.string,
  textStyle: PropTypes.any,
  isShadow: PropTypes.bool,
  wrapperStyle: PropTypes.any,
  subTitle: PropTypes.string,
  iconRight: PropTypes.string,
  customIconRight: PropTypes.string,
};

Button.defaultProps = {
  center: true,
};

export default Button;

const styles = StyleSheet.create({
  buttonWithText: {
    marginTop: 0,
    height: 50,
    flexDirection: 'row',
    borderRadius: 7,
    alignItems: 'center',
    backgroundColor: Colors.blur,
  },
  center: {
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.primaryText,
  },
  disabledBtt: {
    backgroundColor: Colors.blur,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
    elevation: 7,
  },
  iconLeft: { marginRight: 10 },
  iconRight: {
    marginLeft: 10,
  },
});
