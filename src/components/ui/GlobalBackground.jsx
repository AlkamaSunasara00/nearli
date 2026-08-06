import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

export const GlobalBackground = ({ children, style }) => {
  return (
    <View style={[styles.container, { backgroundColor: '#F5F2EF' }]}>
      <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%">
        <Defs>
          <RadialGradient id="grad1" cx="15%" cy="15%" r="50%" fx="15%" fy="15%">
            <Stop offset="0%" stopColor="#FBEADD" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FBEADD" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="grad2" cx="85%" cy="20%" r="55%" fx="85%" fy="20%">
            <Stop offset="0%" stopColor="#E2DEF6" stopOpacity="1" />
            <Stop offset="100%" stopColor="#E2DEF6" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad1)" />
        <Rect width="100%" height="100%" fill="url(#grad2)" />
      </Svg>
      <View style={[styles.content, style]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
