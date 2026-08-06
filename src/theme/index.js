import { lightColors, darkColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radius } from './radius';
import { shadows } from './shadows';

export const lightTheme = {
  colors: lightColors,
  spacing,
  typography,
  radius,
  shadows: shadows.light,
  dark: false,
};

export const darkTheme = {
  colors: darkColors,
  spacing,
  typography,
  radius,
  shadows: shadows.dark,
  dark: true,
};

export { lightColors, darkColors, spacing, typography, radius, shadows };
