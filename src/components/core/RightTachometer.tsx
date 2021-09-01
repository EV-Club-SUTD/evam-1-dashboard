import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

import { FINAL_TACHOMETER_HEIGHT } from '../../utils/config';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface RightTachometerProps {
  progress: Animated.SharedValue<number>;
  style?: StyleProp<ViewStyle>;
}

const RightTachometer: React.FC<RightTachometerProps> = ({
  progress,
  style,
}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      height: interpolate(progress.value, [0, 100], [840, 0]),
    };
  });
  return (
    <View style={style}>
      <Svg
        width={FINAL_TACHOMETER_HEIGHT * 0.66325}
        height={FINAL_TACHOMETER_HEIGHT}
        viewBox='0 0 566 851'
        fill='none'>
        <Path
          d='M13.4435 842.83V812.525H2.12323V808.471H29.3576V812.525H17.9904V842.83H13.4435ZM34.1857 842.83V808.471H38.7326V822.58H56.592V808.471H61.1389V842.83H56.592V826.635H38.7326V842.83H34.1857ZM68.8029 842.83V808.471H84.0373C87.0998 808.471 89.4279 808.783 91.0217 809.408C92.6154 810.018 93.8889 811.104 94.842 812.666C95.7951 814.229 96.2717 815.955 96.2717 817.846C96.2717 820.283 95.4826 822.338 93.9045 824.01C92.3264 825.682 89.8889 826.744 86.592 827.197C87.7951 827.775 88.7092 828.346 89.3342 828.908C90.6623 830.127 91.9201 831.65 93.1076 833.479L99.0842 842.83H93.3654L88.8185 835.682C87.4904 833.619 86.3967 832.041 85.5373 830.947C84.6779 829.854 83.9045 829.088 83.217 828.65C82.5451 828.213 81.8576 827.908 81.1545 827.736C80.6389 827.627 79.7951 827.572 78.6232 827.572H73.3498V842.83H68.8029ZM73.3498 823.635H83.1232C85.2014 823.635 86.8264 823.424 87.9982 823.002C89.1701 822.564 90.0607 821.877 90.6701 820.939C91.2795 819.986 91.5842 818.955 91.5842 817.846C91.5842 816.221 90.9904 814.885 89.8029 813.838C88.631 812.791 86.7717 812.268 84.2248 812.268H73.3498V823.635ZM102.037 826.096C102.037 820.393 103.569 815.932 106.631 812.713C109.694 809.479 113.647 807.861 118.49 807.861C121.662 807.861 124.522 808.619 127.069 810.135C129.615 811.65 131.553 813.768 132.881 816.486C134.225 819.189 134.897 822.26 134.897 825.697C134.897 829.182 134.194 832.299 132.787 835.049C131.381 837.799 129.389 839.885 126.811 841.307C124.233 842.713 121.451 843.416 118.467 843.416C115.233 843.416 112.342 842.635 109.795 841.072C107.248 839.51 105.319 837.377 104.006 834.674C102.694 831.971 102.037 829.111 102.037 826.096ZM106.725 826.166C106.725 830.307 107.834 833.572 110.053 835.963C112.287 838.338 115.084 839.525 118.444 839.525C121.865 839.525 124.678 838.322 126.881 835.916C129.1 833.51 130.209 830.096 130.209 825.674C130.209 822.877 129.733 820.439 128.779 818.361C127.842 816.268 126.459 814.65 124.631 813.51C122.819 812.354 120.779 811.775 118.514 811.775C115.295 811.775 112.522 812.885 110.194 815.104C107.881 817.307 106.725 820.994 106.725 826.166ZM149.522 842.83V812.525H138.201V808.471H165.436V812.525H154.069V842.83H149.522ZM178.865 842.83V812.525H167.545V808.471H194.779V812.525H183.412V842.83H178.865ZM199.279 842.83V808.471H203.826V838.775H220.748V842.83H199.279ZM226.279 842.83V808.471H251.123V812.525H230.826V823.049H249.834V827.08H230.826V838.775H251.92V842.83H226.279Z'
          fill='white'
        />
        <Path d='M0 850H324.426' stroke='white' strokeWidth={2} />
        <Path
          d='M362.855 486.845L265.53 840L330.748 840L565.463 -1.32048e-05L362.855 -4.28479e-06C362.855 -4.28479e-06 380.413 40.8169 403.49 149.07C426.567 257.324 362.855 486.845 362.855 486.845Z'
          fill='url(#paint0_linear)'
        />
        <AnimatedRect
          opacity={0.8}
          x={265.53}
          width={300}
          animatedProps={animatedProps}
          fill='black'
        />
        <Defs>
          <LinearGradient
            id='paint0_linear'
            x1={566.032}
            y1={840}
            x2={566.032}
            y2={-0.0000194161}
            gradientUnits='userSpaceOnUse'>
            <Stop stopColor='#00C2FF' />
            <Stop offset={0.440625} stopColor='#AFE550' />
            <Stop offset={0.794792} stopColor='#FFF500' />
            <Stop offset={1} stopColor='#FF0000' />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

RightTachometer.defaultProps = {
  style: undefined,
};

export default RightTachometer;