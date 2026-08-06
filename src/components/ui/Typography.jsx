import React from 'react';
import { Text } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const Typography = ({
  variant = 'body',
  color = 'text',
  align = 'left',
  weight = 'regular',
  style,
  children,
  ...props
}) => {
  const { theme } = useAppTheme();

  const fontSize = theme.typography.sizes[variant] || theme.typography.sizes.body;
  const lineHeight = theme.typography.lineHeights[variant] || theme.typography.lineHeights.body;
  const textColor = theme.colors[color] || color;

  // Let the typography tokens dictate font weight unless overridden by the `weight` prop explicitly
  let fontFamily = theme.typography.fonts.regular;
  
  // First, check default weight for the variant from the design system
  const defaultWeight = theme.typography.weights[variant] || '400';
  
  let targetWeight = defaultWeight;

  // Override if prop is explicitly passed
  if (weight === 'medium') targetWeight = '500';
  if (weight === 'semibold') targetWeight = '600';
  if (weight === 'bold') targetWeight = '700';

  if (targetWeight === '500') fontFamily = theme.typography.fonts.medium;
  else if (targetWeight === '600') fontFamily = theme.typography.fonts.semiBold;
  else if (targetWeight === '700') fontFamily = theme.typography.fonts.bold;

  return (
    <Text
      style={[
        {
          fontSize,
          lineHeight,
          color: textColor,
          textAlign: align,
          fontFamily, // Relying on the loaded Expo fonts instead of hardcoded fontWeight
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
