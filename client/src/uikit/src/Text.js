import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text as RNText } from 'react-native';
import { Fonts, Colors } from 'themes';

const Text = (props) => {
  const { type, color, center, underLine, style, children, bold } = props;
  return (
    <RNText
      {...props}
      style={[
        styles.normal,
        styles[type],
        color && { color },
        center && styles.center,
        underLine && styles.txtUnderline,
        bold && styles.bold,
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

/* eslint-disable react-native/no-unused-styles */
const styles = StyleSheet.create({
  // TODO: Title
  bigTitle: {
    // 36
    fontFamily: Fonts.type.regular,
    fontSize: 45,
    fontWeight: Fonts.fontWeight.regular,
    color: Colors.primaryText,
  },
  largeTitleBold: {
    // 34
    fontFamily: Fonts.type.bold,
    fontSize: 36,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  largeTitle: {
    // 36
    fontFamily: Fonts.type.regular,
    fontSize: 36,
    fontWeight: Fonts.fontWeight.regular,
    color: Colors.primaryText,
  },
  title: {
    // 28
    fontFamily: Fonts.type.regular,
    fontSize: 28,
    fontWeight: Fonts.fontWeight.regular,
    color: Colors.primaryText,
  },
  titleBold: {
    // 28
    fontFamily: Fonts.type.bold,
    fontSize: 28,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  titleSemiBold: {
    // 28
    fontFamily: Fonts.type.semiboldDisplay,
    fontSize: 28,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  title1Bold: {
    // 26
    fontFamily: Fonts.type.regular,
    fontSize: 26,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  title1: {
    // 26
    fontFamily: Fonts.type.semibold,
    fontSize: 28,
    // fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  title2Bold: {
    // 23
    fontFamily: Fonts.type.regular,
    fontSize: 23,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  title2: {
    // 23
    fontFamily: Fonts.type.semiboldDisplay,
    fontSize: 23,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  headline: {
    // semi bold 19
    fontFamily: Fonts.type.semibold,
    fontSize: 22,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  head: {
    // semi bold 19
    fontFamily: Fonts.type.medium,
    fontSize: 20,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.primaryText,
  },
  // TODO: Body
  body1SemiBold: {
    fontFamily: Fonts.type.semibold,
    fontSize: 18,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  body1: {
    // 18
    fontFamily: Fonts.type.regular,
    fontSize: 18,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  body1Bold: {
    // 18
    fontFamily: Fonts.type.bold,
    fontSize: 18,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryTextBlur,
  },
  body1Medium: {
    // 18
    fontFamily: Fonts.type.regular,
    fontSize: 18,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.primaryTextBlur,
  },
  body2: {
    // 16
    fontFamily: Fonts.type.regular,
    fontSize: 16,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  body2Medium: {
    // 16
    fontFamily: Fonts.type.medium,
    fontSize: 16,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.primaryTextBlur,
  },
  body2Bold: {
    // 16
    fontFamily: Fonts.type.bold,
    fontSize: 16,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryTextBlur,
  },
  body2SemiBold: {
    // 16
    fontFamily: Fonts.type.semibold,
    fontSize: 16,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  body3: {
    // 14
    fontFamily: Fonts.type.regular,
    fontSize: 14,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  body3SemiBold: {
    // 14
    fontFamily: Fonts.type.semibold,
    fontSize: 14,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  body3Bold: {
    // 14
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryTextBlur,
  },
  body3Medium: {
    // 14
    fontFamily: Fonts.type.medium,
    fontSize: 14,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.primaryTextBlur,
  },
  semiMedium: {
    // 14
    fontFamily: Fonts.type.medium,
    fontSize: 13,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.secondaryText,
  },
  semiBold: {
    // 14
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.secondaryText,
  },
  semi: {
    // 14
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    fontWeight: Fonts.fontWeight.regular,
    color: Colors.secondaryText,
  },
  small: {
    // 12
    fontFamily: Fonts.type.light,
    fontSize: 12,
    fontWeight: Fonts.fontWeight.light,
    color: Colors.primaryTextBlur,
  },
  smallNormal: {
    // 12 nomal
    fontFamily: Fonts.type.normal,
    fontSize: 12,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  smallMedium: {
    // 12 nomal
    fontFamily: Fonts.type.medium,
    fontSize: 12,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.primaryTextBlur,
  },
  smallSemiBold: {
    // 12
    fontFamily: Fonts.type.semibold,
    fontSize: 12,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryTextBlur,
  },
  smallBold: {
    // 12
    fontFamily: Fonts.type.bold,
    fontSize: 12,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryTextBlur,
  },
  tiny: {
    // 10
    fontFamily: Fonts.type.regular,
    fontSize: 9,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryText,
  },
  tinyBold: {
    // 10
    fontFamily: Fonts.type.bold,
    fontSize: 9,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  tinyMedium: {
    // 10
    fontFamily: Fonts.type.medium,
    fontSize: 10,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.primaryText,
  },
  tinySemiBold: {
    fontFamily: Fonts.type.semibold,
    fontSize: 9,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  note: {
    // 10
    fontFamily: Fonts.type.medium,
    fontSize: 10,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.primaryTextBlur,
  },
  noteBold: {
    // 10
    fontFamily: Fonts.type.bold,
    fontSize: 10,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryTextBlur,
  },
  // TODO: Button
  button: {
    // 14 bold
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.default,
    // fontFamily: Fonts.type.regular,
    // fontWeight: Fonts.fontWeight.bold,
    // fontSize: Fonts.size.semi,
  },
  navButton: {
    // 10 600
    fontFamily: Fonts.type.semibold,
    fontSize: 10,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primary,
  },
  // TODO: Text Style
  center: {
    textAlign: 'center',
  },
  txtUnderline: {
    textDecorationLine: 'underline',
  },
  bold: {
    fontFamily: Fonts.type.bold,
    fontWeight: Fonts.fontWeight.bold,
  },
});

Text.propTypes = {
  type: PropTypes.oneOf(Object.keys(styles)),
  color: PropTypes.string,
  center: PropTypes.bool,
  underLine: PropTypes.bool,
  style: PropTypes.any,
  children: PropTypes.any,
};

Text.defaultProps = {
  type: 'body2',
};

export default Text;
