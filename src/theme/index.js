import { lightColors, darkColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radius } from './radius';
import { shadows } from './shadows';
import { gradients, glows } from './gradients';
import { animation } from './animation';

export const lightTheme = {
  colors: lightColors,
  spacing,
  typography,
  radius,
  shadows,
  gradients,
  glows,
  animation,
  dark: false,
};

export const darkTheme = {
  colors: darkColors,
  spacing,
  typography,
  radius,
  shadows,
  gradients,
  glows,
  animation,
  dark: true,
};

export { lightColors, darkColors, spacing, typography, radius, shadows, gradients, glows, animation };
