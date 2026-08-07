import { lightColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radius } from './radius';
import { shadows } from './shadows';
import { gradients, glows } from './gradients';
import { animation } from './animation';

export const appTheme = {
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

export const lightTheme = appTheme;

export { lightColors, spacing, typography, radius, shadows, gradients, glows, animation };
