// LOCA - Animation Utilities (Light Luxury Design System)
import { Animated, Easing } from 'react-native';

// Animation Duration Constants
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 1000,
} as const;

// Easing Functions
export const EASING_FUNCTIONS = {
  linear: Easing.linear,
  ease: Easing.ease,
  easeIn: Easing.in(Easing.quad),
  easeOut: Easing.out(Easing.quad),
  easeInOut: Easing.inOut(Easing.quad),
  bounceIn: Easing.in(Easing.bounce),
  bounceOut: Easing.out(Easing.bounce),
  elastic: Easing.elastic(1),
  spring: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Custom spring curve
} as const;

// Pre-built Animation Functions
export class LocaAnimations {
  
  /**
   * Fade In Animation
   */
  static fadeIn(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.normal
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: EASING_FUNCTIONS.easeOut,
      useNativeDriver: true,
    });
  }

  /**
   * Fade Out Animation
   */
  static fadeOut(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.normal
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: EASING_FUNCTIONS.easeIn,
      useNativeDriver: true,
    });
  }

  /**
   * Scale In Animation (Pop Effect)
   */
  static scaleIn(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.normal
  ): Animated.CompositeAnimation {
    return Animated.spring(animatedValue, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });
  }

  /**
   * Scale Out Animation
   */
  static scaleOut(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.fast
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: EASING_FUNCTIONS.easeIn,
      useNativeDriver: true,
    });
  }

  /**
   * Slide In From Bottom
   */
  static slideInFromBottom(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.normal
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: EASING_FUNCTIONS.easeOut,
      useNativeDriver: true,
    });
  }

  /**
   * Slide Out To Bottom
   */
  static slideOutToBottom(
    animatedValue: Animated.Value,
    slideDistance: number = 300,
    duration: number = ANIMATION_DURATIONS.normal
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: slideDistance,
      duration,
      easing: EASING_FUNCTIONS.easeIn,
      useNativeDriver: true,
    });
  }

  /**
   * Slide In From Right
   */
  static slideInFromRight(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.normal
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: EASING_FUNCTIONS.easeOut,
      useNativeDriver: true,
    });
  }

  /**
   * Slide In From Left
   */
  static slideInFromLeft(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.normal
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: EASING_FUNCTIONS.easeOut,
      useNativeDriver: true,
    });
  }

  /**
   * Bounce Animation
   */
  static bounce(
    animatedValue: Animated.Value,
    scale: number = 1.1
  ): Animated.CompositeAnimation {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: scale,
        duration: ANIMATION_DURATIONS.fast,
        easing: EASING_FUNCTIONS.easeOut,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: ANIMATION_DURATIONS.fast,
        easing: EASING_FUNCTIONS.easeIn,
        useNativeDriver: true,
      }),
    ]);
  }

  /**
   * Pulse Animation (Looping)
   */
  static pulse(
    animatedValue: Animated.Value,
    minScale: number = 0.95,
    maxScale: number = 1.05
  ): Animated.CompositeAnimation {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: maxScale,
          duration: ANIMATION_DURATIONS.slow,
          easing: EASING_FUNCTIONS.easeInOut,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: minScale,
          duration: ANIMATION_DURATIONS.slow,
          easing: EASING_FUNCTIONS.easeInOut,
          useNativeDriver: true,
        }),
      ])
    );
  }

  /**
   * Shake Animation (Error feedback)
   */
  static shake(
    animatedValue: Animated.Value,
    intensity: number = 10
  ): Animated.CompositeAnimation {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: intensity,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: -intensity,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: intensity,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]);
  }

  /**
   * Rotate Animation (360 degrees)
   */
  static rotate360(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.verySlow
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: EASING_FUNCTIONS.linear,
      useNativeDriver: true,
    });
  }

  /**
   * Stagger Animation (Multiple items)
   */
  static stagger(
    animations: Animated.CompositeAnimation[],
    staggerDelay: number = 100
  ): Animated.CompositeAnimation {
    return Animated.stagger(staggerDelay, animations);
  }

  /**
   * Parallel Animation
   */
  static parallel(
    animations: Animated.CompositeAnimation[]
  ): Animated.CompositeAnimation {
    return Animated.parallel(animations);
  }

  /**
   * Sequence Animation
   */
  static sequence(
    animations: Animated.CompositeAnimation[]
  ): Animated.CompositeAnimation {
    return Animated.sequence(animations);
  }

  /**
   * Card Flip Animation
   */
  static flip(
    animatedValue: Animated.Value,
    duration: number = ANIMATION_DURATIONS.normal
  ): Animated.CompositeAnimation {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: duration / 2,
        easing: EASING_FUNCTIONS.easeIn,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration / 2,
        easing: EASING_FUNCTIONS.easeOut,
        useNativeDriver: true,
      }),
    ]);
  }

  /**
   * Elastic Scale Animation
   */
  static elasticScale(
    animatedValue: Animated.Value
  ): Animated.CompositeAnimation {
    return Animated.spring(animatedValue, {
      toValue: 1,
      tension: 300,
      friction: 4,
      useNativeDriver: true,
    });
  }

  /**
   * Loading Dots Animation
   */
  static loadingDots(
    dot1: Animated.Value,
    dot2: Animated.Value,
    dot3: Animated.Value
  ): Animated.CompositeAnimation {
    const animateDot = (animatedValue: Animated.Value, delay: number) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 400,
          easing: EASING_FUNCTIONS.easeInOut,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 400,
          easing: EASING_FUNCTIONS.easeInOut,
          useNativeDriver: true,
        }),
      ]);

    return Animated.loop(
      Animated.parallel([
        animateDot(dot1, 0),
        animateDot(dot2, 200),
        animateDot(dot3, 400),
      ])
    );
  }

  /**
   * Progress Bar Animation
   */
  static progressBar(
    animatedValue: Animated.Value,
    targetValue: number,
    duration: number = ANIMATION_DURATIONS.slow
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue: targetValue,
      duration,
      easing: EASING_FUNCTIONS.easeOut,
      useNativeDriver: false, // Layout animation
    });
  }
}

// Animation Helper Functions
export const createAnimatedValue = (initialValue: number = 0): Animated.Value => {
  return new Animated.Value(initialValue);
};

export const createAnimatedValueXY = (initialValue: { x: number; y: number } = { x: 0, y: 0 }): Animated.ValueXY => {
  return new Animated.ValueXY(initialValue);
};

// Interpolation Helpers
export const createOpacityInterpolation = (
  animatedValue: Animated.Value,
  inputRange: number[] = [0, 1],
  outputRange: number[] = [0, 1]
) => {
  return animatedValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });
};

export const createScaleInterpolation = (
  animatedValue: Animated.Value,
  inputRange: number[] = [0, 1],
  outputRange: number[] = [0, 1]
) => {
  return animatedValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });
};

export const createTranslateInterpolation = (
  animatedValue: Animated.Value,
  inputRange: number[] = [0, 1],
  outputRange: string[] = ['0px', '100px']
) => {
  return animatedValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });
};

export const createRotateInterpolation = (
  animatedValue: Animated.Value,
  inputRange: number[] = [0, 1],
  outputRange: string[] = ['0deg', '360deg']
) => {
  return animatedValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });
};

// Animation Presets for Common UI Elements
export const ANIMATION_PRESETS = {
  // Button Press
  buttonPress: {
    scaleDown: 0.96,
    duration: ANIMATION_DURATIONS.fast,
  },

  // Card Appearance
  cardAppear: {
    initialScale: 0.9,
    initialOpacity: 0,
    duration: ANIMATION_DURATIONS.normal,
  },

  // Modal Appearance
  modalAppear: {
    initialScale: 0.8,
    initialOpacity: 0,
    duration: ANIMATION_DURATIONS.normal,
  },

  // Toast Notification
  toast: {
    slideDistance: 100,
    duration: ANIMATION_DURATIONS.normal,
  },

  // Loading Indicator
  loading: {
    rotationDuration: ANIMATION_DURATIONS.verySlow,
  },

  // Pull to Refresh
  pullToRefresh: {
    threshold: 60,
    duration: ANIMATION_DURATIONS.normal,
  },
} as const;