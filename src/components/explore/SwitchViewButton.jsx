import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence, 
  withDelay, 
  withRepeat, 
  Easing,
  cancelAnimation
} from 'react-native-reanimated';
import { RefreshCw } from 'lucide-react-native';

export const SwitchViewButton = ({ onPress, IconComponent, color = '#FAFAFA' }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Idle animation: rotate 180 degrees every 3 seconds
    rotation.value = withRepeat(
      withSequence(
        withTiming(rotation.value + 180, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withDelay(3000, withTiming(rotation.value + 180, { duration: 0 })) // Wait 3s before next rotation
      ),
      -1, // Infinite
      false // No reverse
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, []);

  const handlePress = () => {
    cancelAnimation(rotation);
    // Rotate full 360 quickly on tap
    rotation.value = withTiming(rotation.value + 360, { duration: 400, easing: Easing.out(Easing.ease) }, () => {
      // Resume idle animation
      rotation.value = withRepeat(
        withSequence(
          withDelay(3000, withTiming(rotation.value + 180, { duration: 600, easing: Easing.inOut(Easing.ease) }))
        ),
        -1,
        false
      );
    });
    if (onPress) onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={styles.container}>
      <Animated.View style={[styles.orbit, animatedStyle]}>
        <RefreshCw size={48} color={color} strokeWidth={1} />
      </Animated.View>
      <View style={styles.centerIcon}>
        <IconComponent size={25} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    
  },
  orbit: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  centerIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
