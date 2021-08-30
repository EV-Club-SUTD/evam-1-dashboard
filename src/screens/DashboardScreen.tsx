import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Subscription } from 'react-native-ble-plx';
import { LinearGradient } from 'expo-linear-gradient';
import RadioPlayer from 'react-native-radio-player';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';

import SpeedIndicator from '../components/SpeedIndicator';
import LeftTachometer from '../components/LeftTachometer';
import RightTachometer from '../components/RightTachometer';
import BatteryStatistics from '../components/BatteryStatistics';
import DashboardButtonGroup from '../components/DashboardMenu';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  CORE_CHARACTERISTIC_UUID,
  CORE_REFRESH_RATE,
  CORE_SERVICE_UUID,
  STATUS_CHARACTERISTIC_UUID,
  STATUS_SERVICE_UUID,
} from '../utils/config';
import { bleManagerRef } from '../utils/BleHelper';
import { decodeBleString, getCharacteristic } from '../utils/utils';
import { channelsSelector } from '../features/radio/channelsSlice';
import SheetHandle from '../components/SheetHandle';
import { setCurrentChannel } from '../features/radio/playerSlice';
import RadioPlayerUI from '../components/RadioPlayerUI';
import RadioChannelItem from '../components/RadioChannelItem';
import { RadioChannel } from '../types';
import colors from '../utils/colors';
import TopIndicator from '../components/TopIndicator';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
  menu: {
    position: 'absolute',
    top: 32,
    left: 32,
  },
  battery: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 16,
  },
  analogIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    bottom: 16,
  },
  speedIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftTachometer: {
    right: 70,
  },
  rightTachometer: {
    left: 70,
  },
  dashboardRadioPlayer: {
    position: 'absolute',
    left: 32,
    bottom: 32,
  },
  bottomSheetBackdrop: {
    backgroundColor: colors.background,
    borderRadius: 20,
  },
  bottomSheetHeader: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Gotham-Narrow',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bottomSheetContentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 32,
  },
  radioChannelList: {
    marginRight: 32,
  },
  bottomSheetRadioPlayerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  imageBackground: {
    backgroundColor: 'black',
    borderRadius: 8,
  },
  bottomSheetRadioPlayer: {
    marginTop: 8,
  },
});

const DashboardScreen = (): JSX.Element => {
  const deviceUUID = useAppSelector(
    (state) => state.settings.selectedDeviceUUID,
  );
  const channels = useAppSelector(channelsSelector.selectAll);
  const currentChannel = useAppSelector((state) => state.player.currentChannel);
  const [isPlaying, setIsPlaying] = useState(false);
  const velocity = useSharedValue(0);
  const acceleration = useSharedValue(0);
  const brake = useSharedValue(0);
  const battPercentage = useSharedValue(0);
  const battVoltage = useSharedValue(0);
  const battCurrent = useSharedValue(0);
  const battTemperature = useSharedValue(0);
  const tps = useSharedValue(-1);
  const sas = useSharedValue(-1);
  const ecu = useSharedValue(-1);
  const bms = useSharedValue(-1);
  const whl = useSharedValue(-1);
  const sheetRef = useRef<BottomSheet>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentChannel) {
      RadioPlayer.radioURL(currentChannel.url);
    } else {
      dispatch(setCurrentChannel(channels[0]));
    }
  }, [channels, currentChannel, dispatch]);

  const handlePlayPause = () => {
    if (isPlaying) {
      RadioPlayer.stop();
      setIsPlaying(false);
    } else {
      RadioPlayer.play();
      setIsPlaying(true);
    }
  };

  const handleSkipBack = () => {
    if (currentChannel) {
      const nextChannelId =
        currentChannel.id - 2 < 0
          ? channels.length - 1
          : currentChannel?.id - 2;
      const nextChannel = channels[nextChannelId];
      RadioPlayer.radioURL(nextChannel.url);
      dispatch(setCurrentChannel(nextChannel));
    }
  };

  const handleSkipForward = () => {
    if (currentChannel) {
      const nextChannelId =
        currentChannel.id > channels.length - 1 ? 0 : currentChannel.id;
      const nextChannel = channels[nextChannelId];
      RadioPlayer.radioURL(nextChannel.url);
      dispatch(setCurrentChannel(nextChannel));
    }
  };

  const handlePressChannelItem = useCallback(
    (channel: RadioChannel) => {
      RadioPlayer.radioURL(channel.url);
      if (!isPlaying) {
        RadioPlayer.play();
        setIsPlaying(true);
      }
      dispatch(setCurrentChannel(channel));
    },
    [dispatch, isPlaying],
  );

  useEffect(() => {
    let coreSubscription: Subscription | undefined;
    let statusSubscription: Subscription | undefined;
    const getDevice = async () => {
      try {
        const device = await bleManagerRef.current?.devices([deviceUUID]);
        if (device) {
          const coreCharacteristic = await getCharacteristic(
            CORE_SERVICE_UUID,
            deviceUUID,
            CORE_CHARACTERISTIC_UUID,
          );
          coreSubscription = coreCharacteristic?.monitor((err, cha) => {
            if (err) {
              console.error(err);
              return;
            }
            const decodedString = decodeBleString(cha?.value);
            velocity.value = withTiming(decodedString.charCodeAt(0), {
              duration: CORE_REFRESH_RATE,
            });
            acceleration.value = withTiming(decodedString.charCodeAt(1), {
              duration: CORE_REFRESH_RATE,
            });
            brake.value = withTiming(decodedString.charCodeAt(2), {
              duration: CORE_REFRESH_RATE,
            });
            battPercentage.value = withTiming(decodedString.charCodeAt(3), {
              duration: CORE_REFRESH_RATE,
            });
            battVoltage.value = withTiming(decodedString.charCodeAt(4), {
              duration: CORE_REFRESH_RATE,
            });
            battCurrent.value = withTiming(
              (decodedString.charCodeAt(5) * 256 +
                decodedString.charCodeAt(6)) /
                10 -
                320,
              {
                duration: CORE_REFRESH_RATE,
              },
            );
            battTemperature.value = withTiming(decodedString.charCodeAt(7), {
              duration: CORE_REFRESH_RATE,
            });
          });
          const statusCharacteristic = await getCharacteristic(
            STATUS_SERVICE_UUID,
            deviceUUID,
            STATUS_CHARACTERISTIC_UUID,
          );

          statusSubscription = statusCharacteristic?.monitor((err, cha) => {
            if (err) {
              console.error(err);
              return;
            }
            const decodedString = decodeBleString(cha?.value);
            tps.value = decodedString.charCodeAt(2);
            sas.value = decodedString.charCodeAt(3);
            ecu.value = decodedString.charCodeAt(0);
            bms.value = decodedString.charCodeAt(1);
            whl.value =
              decodedString.charCodeAt(6) +
                decodedString.charCodeAt(7) +
                decodedString.charCodeAt(8) +
                decodedString.charCodeAt(9) ===
              4
                ? 1
                : 0;
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getDevice();

    return () => {
      coreSubscription?.remove();
      statusSubscription?.remove();
    };
  }, [
    deviceUUID,
    velocity,
    acceleration,
    brake,
    battPercentage,
    battVoltage,
    battCurrent,
    battTemperature,
    tps,
    sas,
    ecu,
    bms,
    whl,
  ]);

  const renderItem = useCallback(
    ({ item }) => (
      <RadioChannelItem radioChannel={item} onPress={handlePressChannelItem} />
    ),
    [handlePressChannelItem],
  );

  return (
    <View style={styles.screen}>
      <TopIndicator tps={tps} sas={sas} ecu={ecu} bms={bms} whl={whl} />
      <View style={[StyleSheet.absoluteFill, styles.analogIndicators]}>
        <LeftTachometer progress={brake} style={styles.leftTachometer} />
        <RightTachometer
          progress={acceleration}
          style={styles.rightTachometer}
        />
      </View>
      <SpeedIndicator
        progress={velocity}
        style={[StyleSheet.absoluteFill, styles.speedIndicator]}
      />
      <BatteryStatistics
        percentage={battPercentage}
        voltage={battVoltage}
        current={battCurrent}
        temperature={battTemperature}
        style={styles.battery}
      />
      <DashboardButtonGroup style={styles.menu} />
      <RadioPlayerUI
        onPressRadioLabel={() => sheetRef.current?.snapToIndex(1)}
        onPressSkipBack={handleSkipBack}
        onPressPlayPause={handlePlayPause}
        onPressSkipForward={handleSkipForward}
        playing={isPlaying}
        currentChannel={currentChannel?.name || ''}
        style={styles.dashboardRadioPlayer}
      />
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={['25%', '99.999%']}
        enablePanDownToClose
        handleComponent={(props) => <SheetHandle {...props} />}
        backgroundComponent={(props) => (
          <View style={[props.style, styles.bottomSheetBackdrop]} />
        )}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={1} />
        )}>
        <View style={styles.bottomSheetContentContainer}>
          <View style={styles.radioChannelList}>
            <Text style={styles.bottomSheetHeader}>Radio Stations</Text>
            <BottomSheetFlatList
              data={channels}
              keyExtractor={(i) => String(i.id)}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <LinearGradient
            colors={[colors.background, '#414345']}
            style={styles.bottomSheetRadioPlayerContainer}>
            <View style={styles.imageBackground}>
              <Image
                source={{
                  uri: currentChannel?.imageUrl,
                  width: 200,
                  height: 200,
                }}
                resizeMode='contain'
              />
            </View>
            <RadioPlayerUI
              onPressSkipBack={handleSkipBack}
              onPressPlayPause={handlePlayPause}
              onPressSkipForward={handleSkipForward}
              playing={isPlaying}
              currentChannel={currentChannel?.name || ''}
              style={styles.bottomSheetRadioPlayer}
            />
          </LinearGradient>
        </View>
      </BottomSheet>
    </View>
  );
};

export default DashboardScreen;
