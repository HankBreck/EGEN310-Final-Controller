import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'

import { sendTcpCommand, sendCutCommand } from './lib/TCP';

export default function App() {
    const [powerRatio, setPowerRatio] = useState(0);
    const [direction, setDirection] = useState(1);
    const [speed, setSpeed] = useState(0);

    useEffect(() => {
        sendTcpCommand(powerRatio, direction, speed)
    }, [powerRatio, direction, speed])

    const handleSpeedChange = (value: number) => {
        setSpeed(Math.round(value));
    };

    const handlePowerRatioChange = (value: number) => {
        setPowerRatio(value);
    };
    
    const handleDirectionChange = (value: number) => {
        if (value == 0) {
            setDirection(1) // Forward
        } else if (value == 1) {
            setDirection(0) // Stopped
        } else {
            setDirection(2); // Backward
        }
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

    const getGearButtonColor = () => {
        if (direction == 0) {
            return 'white'
        } else if (direction == 1) {
            return 'green'
        } else {
            return 'red'
        }
    }

    return (
        <View style={styles.topLevel}>
            <View style={[styles.container, { justifyContent: 'flex-end'}]}>
                <TouchableOpacity style={styles.sliderContainer} onPress={() => sendCutCommand()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Cut</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={2}
                        step={1}
                        onValueChange={handleDirectionChange}
                        thumbTintColor={getGearButtonColor()}
                        minimumTrackTintColor={'red'}
                        maximumTrackTintColor={'green'}
                    />
                    <Text>{getDirectionLabel()}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={[styles.verticalSliderContainer, { transform: [{ rotate: '-90deg' }]}]}>
                    {/* Order of items is flipped, so Text must come before Slider to display below */}
                    <Text style={{transform: [{ rotate: '90deg' }], marginRight: -20 }}>Speed: {`${Math.round((speed/255)*100)}%`}</Text>
                    <Slider
                        style={styles.slider}
                        value={speed}
                        minimumValue={0}
                        maximumValue={255}
                        step={12.75}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#CCCCCC"
                        onValueChange={handleSpeedChange}
                        vertical={true}
                    />
                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        value={powerRatio}
                        minimumValue={-1}
                        maximumValue={1}
                        step={0.1}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#CCCCCC"
                        onValueChange={handlePowerRatioChange}
                    />
                    <Text>Power Ratio: {powerRatio.toPrecision(1)}</Text>
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
        marginTop: 10,
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
    verticalSliderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    slider: {
        width: 150,
        height: 90,
    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
