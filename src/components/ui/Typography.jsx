import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const Typography = ({
  variant = 'body',
  color = 'textPrimary',
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

  let fontWeight = '400';
  if (weight === 'medium' || variant === 'h3' || variant === 'title' || variant === 'button') fontWeight = '500';
  if (weight === 'bold' || variant === 'display' || variant === 'h1' || variant === 'h2') fontWeight = '700';

  return (
    <Text
      style={[
        {
          fontSize,
          lineHeight,
          color: textColor,
          textAlign: align,
          fontWeight,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
