import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { FINAL_TOP_INDICATOR_HEIGHT } from '../utils/config';
import AnimatedIndicator from './AnimatedIndicator';

const transforms = [
  'matrix(1 0 0 -1 45.5 45.5)',
  'matrix(1 0 0 -1 156.5 45.5)',
  'matrix(1 0 0 -1 267.5 45.5)',
  'matrix(1 0 0 -1 378.5 45.5)',
  'matrix(1 0 0 -1 489.5 45.5)',
  'matrix(1 0 0 -1 600.5 45.5)',
  'matrix(1 0 0 -1 711.5 45.5)',
  'matrix(1 0 0 -1 822.5 45.5)',
  'matrix(1 0 0 -1 933.5 45.5)',
  'matrix(1 0 0 -1 1044.5 45.5)',
  'matrix(1 0 0 -1 1155.5 45.5)',
  'matrix(1 0 0 -1 1266.5 45.5)',
  'matrix(1 0 0 -1 1377.5 45.5)',
];

const TopIndicator = props => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg
        width='60%'
        height={FINAL_TOP_INDICATOR_HEIGHT}
        viewBox='0 0 1423 121'
        fill='none'
        {...props}>
        {transforms.map((transform, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <AnimatedIndicator
            transform={transform}
            progress={progress}
            key={key}
          />
        ))}
        <Path
          d='M139.02 115H141.27V96.1H147.18V94H133.14V96.1H139.02V115ZM156.21 115H158.49V106.48L165.87 94H163.32L157.38 104.26L151.44 94H148.83L156.21 106.54V115ZM169.002 115H171.252V106.84H176.022L181.302 115H184.002L178.362 106.39C181.272 105.67 183.342 103.66 183.342 100.33V100.27C183.342 98.5 182.742 97 181.692 95.95C180.492 94.72 178.572 94 176.172 94H169.002V115ZM171.252 104.8V96.07H176.022C179.172 96.07 181.092 97.6 181.092 100.36V100.42C181.092 103.09 179.202 104.8 175.782 104.8H171.252ZM187.635 115H200.595V112.93H189.885V105.43H199.365V103.39H189.885V96.07H200.445V94H187.635V115ZM216.891 115H219.141V96.1H225.051V94H211.011V96.1H216.891V115ZM228.709 115H241.669V112.93H230.959V105.43H240.439V103.39H230.959V96.07H241.519V94H228.709V115ZM245.702 115H247.892V98.08L254.372 109.3H254.462L260.942 98.08V115H263.192V94H260.852L254.432 105.25L248.042 94H245.702V115ZM268.231 115H270.481V107.59H274.291C278.581 107.56 281.941 105.16 281.941 100.72V100.66C281.941 96.52 279.031 94 274.561 94H268.231V115ZM270.481 105.55V96.07H274.441C277.621 96.07 279.661 97.69 279.661 100.75V100.78C279.661 103.66 277.621 105.55 274.351 105.55H270.481Z'
          fill='white'
        />
        <Path d='M6 88H430' stroke='white' strokeWidth={2} />
        <Path
          d='M572.52 115H579.78C584.19 115 587.1 112.9 587.1 109.33V109.24C587.1 106.39 585.21 104.92 582.75 104.2C584.49 103.51 586.2 102.1 586.2 99.31V99.25C586.2 97.84 585.69 96.67 584.82 95.8C583.65 94.63 581.85 94 579.63 94H572.52V115ZM583.92 99.61C583.92 102.04 582.09 103.42 579.3 103.42H574.77V96.04H579.51C582.3 96.04 583.92 97.39 583.92 99.55V99.61ZM584.82 109.12V109.18C584.82 111.58 582.9 112.96 579.87 112.96H574.77V105.4H579.6C582.99 105.4 584.82 106.78 584.82 109.12ZM591.065 115H593.315V106.84H598.085L603.365 115H606.065L600.425 106.39C603.335 105.67 605.405 103.66 605.405 100.33V100.27C605.405 98.5 604.805 97 603.755 95.95C602.555 94.72 600.635 94 598.235 94H591.065V115ZM593.315 104.8V96.07H598.085C601.235 96.07 603.155 97.6 603.155 100.36V100.42C603.155 103.09 601.265 104.8 597.845 104.8H593.315ZM608.08 115H610.39L612.43 109.48H621.88L623.92 115H626.32L618.31 93.88H616.09L608.08 115ZM613.18 107.44L617.17 96.79L621.13 107.44H613.18ZM629.825 115H632.075V109.12L635.615 105.01L642.515 115H645.245L637.175 103.18L644.825 94H642.035L632.075 106.12V94H629.825V115ZM648.311 115H661.271V112.93H650.561V105.43H660.041V103.39H650.561V96.07H661.121V94H648.311V115ZM677.567 115H679.817V96.1H685.727V94H671.687V96.1H677.567V115ZM689.385 115H702.345V112.93H691.635V105.43H701.115V103.39H691.635V96.07H702.195V94H689.385V115ZM706.377 115H708.567V98.08L715.047 109.3H715.137L721.617 98.08V115H723.867V94H721.527L715.107 105.25L708.717 94H706.377V115ZM728.907 115H731.157V107.59H734.967C739.257 107.56 742.617 105.16 742.617 100.72V100.66C742.617 96.52 739.707 94 735.237 94H728.907V115ZM731.157 105.55V96.07H735.117C738.297 96.07 740.337 97.69 740.337 100.75V100.78C740.337 103.66 738.297 105.55 735.027 105.55H731.157Z'
          fill='white'
        />
        <Path d='M444 88H868' stroke='white' strokeWidth={2} />
        <Path
          d='M1023.52 115H1036.48V112.93H1025.77V105.43H1035.25V103.39H1025.77V96.07H1036.33V94H1023.52V115ZM1046.39 115.3C1050.14 115.3 1052.9 112.93 1052.9 109.57V109.51C1052.9 106.72 1051.34 105.01 1047.08 103.42C1043.12 101.98 1042.19 100.93 1042.19 99.1V99.04C1042.19 97.24 1043.75 95.77 1046.15 95.77C1047.98 95.77 1049.63 96.46 1051.19 97.81L1052.54 96.07C1050.68 94.45 1048.67 93.7 1046.24 93.7C1042.55 93.7 1039.91 96.1 1039.91 99.25V99.31C1039.91 102.28 1041.62 103.84 1045.97 105.46C1049.78 106.81 1050.62 107.92 1050.62 109.66V109.69C1050.62 111.7 1048.94 113.23 1046.42 113.23C1044.05 113.23 1042.25 112.24 1040.51 110.62L1039.1 112.33C1041.29 114.37 1043.69 115.3 1046.39 115.3ZM1065.14 115.3C1068.02 115.3 1070.03 114.16 1071.8 112.42L1070.45 110.86C1068.95 112.3 1067.42 113.2 1065.26 113.2C1061.39 113.2 1058.42 109.69 1058.42 104.53V104.41C1058.42 99.34 1061.39 95.8 1065.26 95.8C1067.39 95.8 1068.98 96.73 1070.3 97.99L1071.68 96.28C1070.03 94.75 1068.17 93.7 1065.29 93.7C1060.04 93.7 1056.08 98.08 1056.08 104.44V104.62C1056.08 111.01 1059.95 115.3 1065.14 115.3ZM1096.46 115.36L1098.17 114.13L1095.02 110.47C1095.98 108.94 1096.79 107.14 1097.54 105.1L1095.71 104.35C1095.08 106.09 1094.45 107.59 1093.67 108.91L1089.44 103.81C1092.17 102.52 1093.88 100.84 1093.88 98.29V98.2C1093.88 95.74 1091.99 93.67 1089.23 93.67C1086.2 93.67 1084.22 95.83 1084.22 98.38V98.47C1084.22 100.09 1084.85 101.41 1086.29 103.27C1083.38 104.74 1081.73 106.84 1081.73 109.51V109.6C1081.73 112.9 1084.25 115.27 1087.67 115.27C1090.16 115.27 1092.08 114.1 1093.7 112.18L1096.46 115.36ZM1088.27 102.46C1086.8 100.66 1086.32 99.64 1086.32 98.44V98.38C1086.32 96.79 1087.49 95.53 1089.17 95.53C1090.7 95.53 1091.81 96.73 1091.81 98.32V98.35C1091.81 100.09 1090.64 101.41 1088.27 102.46ZM1087.85 113.35C1085.57 113.35 1084.01 111.67 1084.01 109.48V109.39C1084.01 107.65 1085.03 105.88 1087.46 104.71L1092.44 110.71C1091.15 112.33 1089.65 113.35 1087.85 113.35ZM1109.21 115H1116.47C1120.88 115 1123.79 112.9 1123.79 109.33V109.24C1123.79 106.39 1121.9 104.92 1119.44 104.2C1121.18 103.51 1122.89 102.1 1122.89 99.31V99.25C1122.89 97.84 1122.38 96.67 1121.51 95.8C1120.34 94.63 1118.54 94 1116.32 94H1109.21V115ZM1120.61 99.61C1120.61 102.04 1118.78 103.42 1115.99 103.42H1111.46V96.04H1116.2C1118.99 96.04 1120.61 97.39 1120.61 99.55V99.61ZM1121.51 109.12V109.18C1121.51 111.58 1119.59 112.96 1116.56 112.96H1111.46V105.4H1116.29C1119.68 105.4 1121.51 106.78 1121.51 109.12ZM1126.2 115H1128.51L1130.55 109.48H1140L1142.04 115H1144.44L1136.43 93.88H1134.21L1126.2 115ZM1131.3 107.44L1135.29 96.79L1139.25 107.44H1131.3ZM1150.19 115H1152.44V96.1H1158.35V94H1144.31V96.1H1150.19V115ZM1166.51 115H1168.76V96.1H1174.67V94H1160.63V96.1H1166.51V115ZM1178.32 115H1191.28V112.93H1180.57V105.43H1190.05V103.39H1180.57V96.07H1191.13V94H1178.32V115ZM1195.32 115H1197.57V106.84H1202.34L1207.62 115H1210.32L1204.68 106.39C1207.59 105.67 1209.66 103.66 1209.66 100.33V100.27C1209.66 98.5 1209.06 97 1208.01 95.95C1206.81 94.72 1204.89 94 1202.49 94H1195.32V115ZM1197.57 104.8V96.07H1202.34C1205.49 96.07 1207.41 97.6 1207.41 100.36V100.42C1207.41 103.09 1205.52 104.8 1202.1 104.8H1197.57ZM1218.71 115H1220.99V106.48L1228.37 94H1225.82L1219.88 104.26L1213.94 94H1211.33L1218.71 106.54V115ZM1251.53 115H1253.78V96.1H1259.69V94H1245.65V96.1H1251.53V115ZM1263.34 115H1276.3V112.93H1265.59V105.43H1275.07V103.39H1265.59V96.07H1276.15V94H1263.34V115ZM1280.34 115H1282.53V98.08L1289.01 109.3H1289.1L1295.58 98.08V115H1297.83V94H1295.49L1289.07 105.25L1282.68 94H1280.34V115ZM1302.87 115H1305.12V107.59H1308.93C1313.22 107.56 1316.58 105.16 1316.58 100.72V100.66C1316.58 96.52 1313.67 94 1309.2 94H1302.87V115ZM1305.12 105.55V96.07H1309.08C1312.26 96.07 1314.3 97.69 1314.3 100.75V100.78C1314.3 103.66 1312.26 105.55 1308.99 105.55H1305.12Z'
          fill='white'
        />
        <Path d='M895 88H1423' stroke='white' strokeWidth={2} />
      </Svg>
    </View>
  );
};

export default TopIndicator;