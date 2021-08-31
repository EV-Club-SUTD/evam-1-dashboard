import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import colors from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
  },
  label: {
    color: 'white',
    fontFamily: 'Gotham-Narrow',
    fontSize: 24,
    marginBottom: 4,
  },
  colorTextContainer: {
    flexDirection: 'row',
  },
  colorText: {
    color: 'white',
    fontFamily: 'Gotham-Narrow',
    fontSize: 16,
  },
});

type LightingOptionProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const LightingOption = ({
  label,
  value,
  onValueChange,
  color,
  style,
}: LightingOptionProps): JSX.Element => {
  return (
    <View style={style}>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.colorTextContainer}>
            <Text style={styles.colorText}>Current Color: </Text>
            <Text style={[styles.colorText, { color: color || 'white' }]}>
              {color || 'Not Set'}
            </Text>
          </View>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          thumbColor={colors.primary}
          trackColor={{ false: '#BBBBBB', true: colors.primaryLight }}
        />
      </View>
    </View>
  );
};

LightingOption.defaultProps = {
  color: undefined,
  style: undefined,
};

export default LightingOption;
