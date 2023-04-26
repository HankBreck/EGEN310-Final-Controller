import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'
import { RadioButton } from 'react-native-paper';

import { sendCommand } from './lib/UDP';
import { sendTcpCommand } from './lib/TCP';

export default function App() {
    const [powerRatio, setPowerRatio] = useState(0.5);
    const [direction, setDirection] = useState(1);
    const [speed, setSpeed] = useState(0);

    const [sliderValue, setSliderValue] = useState(1);
    const [cutter, setCutter] = useState(false);

    // TODO: Add ping liveness monitor to show when the rover is connected to WiFi

    useEffect(() => {
        // sendCommand(powerRatio, direction, speed)
        sendTcpCommand(powerRatio, direction, speed)
    }, [powerRatio, direction, speed])

    useEffect(() => {
        // send cutter command
    }, [cutter])

    const handleSpeedChange = (value: number) => {
        setSpeed(Math.round(value));
    };

    const handlePowerRatioChange = (value: number) => {
        setPowerRatio(value);
    };
    
    const handleDirectionChange = (value: number) => {
        setDirection(value);
    };

    const handleCutterChange = () => {
        setCutter(!cutter);
      };

    const getDirectionLabel = () => {
        if (direction == 0) {
            return "Stopped"
        } else if (direction == 1) {
            return "Forward"
        } else if (direction == 2) {
            return "Backward"
        } else {
            return "ERROR"
        }
    }

    const buttonStyle = {
        backgroundColor: cutter ? 'red' : 'green',
      };

    return (
        <View style={styles.topLevel}>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, buttonStyle]} onPress={() => handleCutterChange()}>
                    <Text style={styles.buttonText}>cutter</Text>
                </TouchableOpacity>
                <View style={styles.topLevel}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={2}
                        step={1}
                        value={sliderValue}
                        onValueChange={handleDirectionChange}
                        thumbTintColor={'#000'}
                        minimumTrackTintColor={'#007AFF'}
                        maximumTrackTintColor={'#000'}
                    />
                    <Text>{getDirectionLabel()}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={[styles.slider, { marginBottom: 60, transform: [{ rotate: '-90deg' }]}]}
                        value={speed}
                        minimumValue={0}
                        maximumValue={255}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#CCCCCC"
                        onValueChange={handleSpeedChange}
                        vertical={true}
                    />
                    <Text>Speed: {speed}</Text>
                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        value={powerRatio}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#CCCCCC"
                        onValueChange={handlePowerRatioChange}
                    />
                    <Text>Power Ratio: {powerRatio.toPrecision(2)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topLevel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 150,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 40,
    },
    sliderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    slider: {
        width: 150,
        height: 40,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});
