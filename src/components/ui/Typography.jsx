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
  const resolvedVariant = theme.typography.aliases?.[variant] || variant;

  const fontSize = theme.typography.sizes[resolvedVariant] || theme.typography.sizes.p2;
  const lineHeight = theme.typography.lineHeights[resolvedVariant] || theme.typography.lineHeights.p2;
  const textColor = theme.colors[color] || color;

  // Let the typography tokens dictate font weight unless overridden by the `weight` prop explicitly
  let fontFamily = theme.typography.fonts.regular;
  
  // First, check default weight for the variant from the design system
  const defaultWeight = theme.typography.weights[resolvedVariant] || '400';
  
  let targetWeight = defaultWeight;

  // Override if prop is explicitly passed
  if (weight === 'medium') targetWeight = '700';
  if (weight === 'semibold') targetWeight = '700';
  if (weight === 'bold') targetWeight = '700';

  if (targetWeight === '700') fontFamily = theme.typography.fonts.bold;

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
