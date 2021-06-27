import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { FINAL_BASE_GRAPHIC_HEIGHT } from '../utils/config';
import BaseGraphic from '../../assets/base-graphic.png';
import ThemedIconButton from '../components/ThemedIconButton';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
  baseGraphic: {
    position: 'absolute',
    bottom: 0,
    width: '101.75%',
    height: FINAL_BASE_GRAPHIC_HEIGHT * 1.1,
  },
  buttonContainer: {
    position: 'absolute',
    left: 32,
    top: 0,
  },
});

const TemperatureScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <ImageBackground source={BaseGraphic} style={styles.baseGraphic} />
      <View style={styles.buttonContainer}>
        <ThemedIconButton
          onPress={() => navigation.goBack()}
          iconName='chevron-back-outline'
        />
      </View>
    </View>
  );
};

export default TemperatureScreen;
