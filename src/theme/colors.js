export const lightColors = {
  primary: '#3E8EF7',
  primaryHover: '#3273C8', // slightly darker for hover
  primaryPressed: '#245BAA', // slightly darker for pressed
  primaryDisabled: '#BFDBFE',
  primarySoft: '#DCEEFF', // Verified Badge Background & Info Banner
  accent: '#1FA7A0', // Signal Teal
  brandDark: '#0F3D3E', // Anchor (Primary Dark)
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3E8EF7',
  background: '#F3F6FA',
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F6FA',
  elevatedSurface: '#FFFFFF',
  borderLight: '#E2E8F0',
  border: '#CBD5E1',
  borderFocused: '#3E8EF7',
  divider: '#E5E7EB',
  textPrimary: '#1F2937',
  textSecondary: '#5A6672',
  textMuted: '#5A6672',
  textDisabled: '#CBD5E1',
  textInverse: '#FFFFFF',
  icon: '#5A6672',
  iconActive: '#3E8EF7',
  transparent: 'transparent',
  overlay: 'rgba(15, 61, 62, 0.5)', // Anchor with opacity
};

export const darkColors = {
  ...lightColors,
  primarySoft: 'rgba(62, 142, 247, 0.15)', // Translucent dark blue for soft backgrounds
  primaryDisabled: '#1E3A8A', // Darker disabled state for dark mode
  background: '#111827', // Standard dark background instead of heavy brandDark
  surface: '#1F2937', // Standard dark surface
  surfaceSecondary: '#111827',
  elevatedSurface: '#374151',
  borderLight: '#374151',
  border: '#4B5563',
  divider: '#374151',
  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  icon: '#9CA3AF',
  iconActive: '#3E8EF7',
  overlay: 'rgba(0, 0, 0, 0.7)',
};
