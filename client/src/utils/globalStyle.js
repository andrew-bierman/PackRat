import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts, Screen } from 'themes';

export const PADDING = 30;

export const BORDER_RADIUS = 5;

export const globalStyle = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignFlexStart: {
    alignItems: 'flex-start',
  },
  alignFlexEnd: {
    alignItems: 'flex-end',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  appPadding: {
    padding: PADDING,
  },
  paddingHorizontal: {
    paddingHorizontal: PADDING,
  },
  marginHorizontal: {
    marginHorizontal: PADDING,
    width: Screen.width - PADDING * 2,
  },
  marginVertical: {
    marginVertical: PADDING,
  },
  borderRadius: {
    borderRadius: BORDER_RADIUS,
  },
  // shadow: {
  //   shadowColor: 'rgba(0, 0, 0, 0.15)',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowRadius: 4,
  //   shadowOpacity: 1,
  //   elevation: 1,
  // },
  shadow: {
    // shadowColor: 'rgba(12, 7, 41, 0.1)',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowRadius: 20,
    // shadowOpacity: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowRadius: 10,
    shadowOpacity: 0.22,
    elevation: 10,
  },
  input: {
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.divider,
    height: 46,
    flex: 1,
    paddingHorizontal: 10,
  },
  border: {
    borderColor: Colors.divider,
    borderWidth: 1,
  },
  txtBtnSmall: {
    fontSize: 10,
    fontFamily: Fonts.type.medium,
  },
  buttonSmall: {
    backgroundColor: Colors.default,
    shadowColor: '#28A7DF',
    shadowOpacity: 0.3,
  },
  card: {
    backgroundColor: Colors.default,
    margin: 20,
    marginVertical: 50,
    borderRadius: 20,
    width: Screen.width - 40,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
    elevation: 7,
  },
  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mt50: {
    marginTop: 50,
  },
  wrap: {
    flexWrap: 'wrap',
  },
  top20: {
    paddingTop: 20,
  },
  top50: {
    paddingTop: 50,
  },
  mb30: {
    marginBottom: 30,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  pb150: {
    paddingBottom: 150,
  },
  vw: {
    width: Dimensions.get('window').width,
  },
  wFull: {
    width: '100%',
  },
});
