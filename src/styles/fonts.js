import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {StyleSheet} from 'react-native';
import colors from './colors';

const ratio = responsiveWidth(100) / responsiveHeight(100);
const scaledFontRatio = ratio > 0.55 ? 8.5 : 7.6;

export const scaledFontSize = s => responsiveFontSize(s / scaledFontRatio);
export const fontSizes = [
  scaledFontSize(24), // 0
  scaledFontSize(22), // 1
  scaledFontSize(20), // 2
  scaledFontSize(12), // 3
  scaledFontSize(14), // 4
  scaledFontSize(14), // 5
  scaledFontSize(13), // 6
  scaledFontSize(12), // 7
  scaledFontSize(11), // 8
  scaledFontSize(10), // 9
  scaledFontSize(8), // 10
];
const color = colors.text;

const fonts = StyleSheet.create({
  megaFontSize: {
    fontSize: scaledFontSize(35),
    fontWeight: '400',
  },
  h1: {
    fontSize: fontSizes[0],
    fontWeight: '400',
    color,
  },
  h2: {
    fontSize: fontSizes[1],
    color,
  },
  h3: {
    fontSize: fontSizes[2],
    color,
  },
  h4: {
    fontSize: fontSizes[3],
    fontWeight: '800',
    color,
  },
  regular: {
    fontSize: fontSizes[4],
    color,
  },
  paragraph: {
    fontSize: fontSizes[5],
    lineHeight: responsiveHeight(3),
  },
  small: {
    fontSize: fontSizes[5],
    color,
  },
  xsmall: {
    fontSize: fontSizes[6],
    color,
  },
  xxsmall: {
    fontSize: fontSizes[7],
    color,
  },
  xxxsmall: {
    fontSize: fontSizes[8],
    color,
  },
  xxxxsmall: {
    fontSize: fontSizes[9],
    color,
  },
  regularText: {
    fontSize: fontSizes[9],
    color,
  },
  semibold: {
    fontSize: fontSizes[9],
  },
  medium: {
    fontSize: fontSizes[9],
  },
  underline: {
    fontSize: fontSizes[9],
    textDecorationLine: 'underline',
  },
});

export default fonts;
