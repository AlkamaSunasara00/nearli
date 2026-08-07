const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;

  const numeric = Number.parseInt(value, 16);

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
};

const withAlpha = (hex, alpha) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const tokens = {
  primary: {
    500: '#FF6A00',
    400: '#FF8833',
    300: '#FFA666',
    200: '#FFC499',
    100: '#FFE1CC',
  },
  dark: {
    500: '#1A1A1A',
    400: '#4D4D4D',
    300: '#808080',
    200: '#B3B3B3',
    100: '#E6E6E6',
  },
  grey: {
    500: '#D9D9D9',
    400: '#E1E1E1',
    300: '#E9E9E9',
    200: '#F1F1F1',
    100: '#FAFAFA',
  },
  accentBlue: '#1E90FF',
  accentOrange: '#FA5A3D',
  accentPurple: '#BA55D3',
  success: '#4CAF50',
  failed: '#E8291C',
  warning: '#FF7A29',
};

const createThemeColors = () => ({
  primary: tokens.primary[500],
  dark: tokens.dark,
  grey: tokens.grey,
  accentBlue: tokens.accentBlue,
  accentOrange: tokens.accentOrange,
  accentPurple: tokens.accentPurple,
  success: tokens.success,
  failed: tokens.failed,
  warning: tokens.warning,

  // Compatibility mappings while screens are migrated to the token families directly.
  background: tokens.grey[100],
  backgroundSecondary: tokens.primary[100],
  backgroundElevated: tokens.grey[100],
  surface: tokens.grey[100],
  surfaceSecondary: tokens.grey[200],
  surfaceElevated: tokens.grey[100],
  input: tokens.grey[100],
  border: tokens.grey[500],
  borderSoft: withAlpha(tokens.dark[500], 0.08),
  divider: withAlpha(tokens.dark[500], 0.1),
  text: tokens.dark[500],
  textPrimary: tokens.dark[500],
  textSecondary: tokens.dark[400],
  textMuted: tokens.dark[300],
  icon: tokens.dark[500],
  iconMuted: tokens.dark[300],
  overlay: withAlpha(tokens.dark[500], 0.45),
  brandDark: tokens.dark[500],
  borderLight: tokens.grey[400],
  primarySoft: tokens.primary[100],
  primaryDark: tokens.primary[400],
  accent: tokens.accentPurple,
  danger: tokens.failed,
  info: tokens.accentBlue,
  white: tokens.grey[100],
  whiteMuted: withAlpha(tokens.grey[100], 0.7),
  successSoft: withAlpha(tokens.success, 0.12),
  failedSoft: withAlpha(tokens.failed, 0.12),
  warningSoft: withAlpha(tokens.warning, 0.12),
  accentBlueSoft: withAlpha(tokens.accentBlue, 0.12),
  accentOrangeSoft: withAlpha(tokens.accentOrange, 0.12),
  accentPurpleSoft: withAlpha(tokens.accentPurple, 0.12),
});

export const lightColors = createThemeColors();

export { withAlpha };
