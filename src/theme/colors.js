export const lightColors = {
  primary: '#0F3D3E',
  primaryHover: '#0b2e2f', // slightly darker for hover
  primaryPressed: '#082324', // slightly darker for pressed
  primaryDisabled: '#8aa6a7',
  primarySoft: '#e1eeef', // Verified Badge Background & Info Banner
  accent: '#1FA7A0', // Signal Teal
  brandDark: '#0F3D3E', // Anchor (Primary Dark)
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3E8EF7',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  elevatedSurface: '#FFFFFF',
  borderLight: '#E2E8F0',
  border: '#CBD5E1',
  borderFocused: '#0F3D3E',
  divider: '#E5E7EB',
  textPrimary: '#1F2937',
  textSecondary: '#5A6672',
  textMuted: '#5A6672',
  textDisabled: '#CBD5E1',
  textInverse: '#FFFFFF',
  icon: '#5A6672',
  iconActive: '#0F3D3E',
  transparent: 'transparent',
  overlay: 'rgba(15, 61, 62, 0.5)', // Anchor with opacity
};

export const darkColors = {
  ...lightColors,
  primarySoft: 'rgba(15, 61, 62, 0.15)', // Translucent brandDark for soft backgrounds
  primaryDisabled: '#082324', // Darker disabled state
  background: '#F8FAFC', // Force light background for now to prevent blue tint in dark mode, or adapt to dark
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  elevatedSurface: '#FFFFFF',
  borderLight: '#E2E8F0',
  border: '#CBD5E1',
  divider: '#E5E7EB',
  textPrimary: '#1F2937',
  textSecondary: '#5A6672',
  textMuted: '#5A6672',
  icon: '#5A6672',
  iconActive: '#0F3D3E',
  overlay: 'rgba(0, 0, 0, 0.7)',
};
