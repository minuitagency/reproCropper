import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {StyleSheet, Platform} from 'react-native';
import colors from './colors';

export const gutters = responsiveWidth(5.33);
export const mainBorderRadius = 5;

const mainShadows = {
  shadowColor: '#C1CBDE',

  shadowOpacity: Platform.OS !== 'ios' ? 0.05 : 0.5,
  shadowRadius: 25,
  shadowOffset: {
    width: 0,
    height: Platform.OS !== 'ios' ? 0 : 4,
  },

  elevation: 5,
};

const containerCenter = {
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  containerCenter,
  mainShadows,

  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerMain: {
    flex: 1,
    backgroundColor: colors.mainWhite,
    padding: gutters,
  },

  containerRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  containerColumnSpaceBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  containerItem: {
    ...containerCenter,
    padding: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: mainBorderRadius,
  },

  containerRound: {
    ...containerCenter,
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: 500,
  },

  separatorHorizontal: {
    width: '100%',
    height: 1,
    marginVertical: responsiveHeight(1.5),
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  defaultHitSlop: {
    top: 10,
    bottom: 10,
    right: 10,
    left: 10,
  },
});

export default styles;
