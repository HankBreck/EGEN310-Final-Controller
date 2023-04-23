import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Joystick } from 'react-joystick-component';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';

const ESP32_IP = "172.20.10.9"
const ACTION = "action"
const RATIO = "ratio"
const SPEED = "speed"
const FORWARD = "forward"
const BACKWARD = "backward"
const STOP = "stop"

export default function App() {
    const [isConnected, setIsConnected] = React.useState(false)
    const sendInstruction = async (ratio: number, direction: string, speed: number) => {
        // TODO: parameterize power ratio, direction, and speed
        const urlParams = "/?" + ACTION + "=" + direction + "&" + RATIO + "=" + ratio + "&" + SPEED + "=" + speed
        console.log(urlParams)
        // fetch("http://" + ESP32_IP + urlParams)
        //     .then(onConnectSuccess, onConnectFail)
    }

    // TODO: Add ping liveness monitor to show when the rover is connected to WiFi

    const onConnectSuccess = () => {
        console.log("Success")
        setIsConnected(true)
    }
    
    const onConnectFail = () => {
        console.log("Failure")
        setIsConnected(false)
    }

    const handleMove = (event: IJoystickUpdateEvent) => {
        // event.x is the horizontal position of the joystick
            // This will determine the ratio of power to give the motors
                // 0 => equal, -1 => all left side, 1 => all right side
        // event.y is the vertical position of the joystick
            // This will determine the speed to give ALL motors
                // 0 => stopped, -1 => 255 backwards, 1 => 255 forwards
        switch(event.type) {
            case 'start':
                // fall through
            case 'move':
                if (!event.x || !event.y) {
                    console.error("Missing event data!")
                    break
                }
                const [ratio, direction, speed] = buildCommand(event.x, event.y)
                // TODO: do we need to handle async?
                sendInstruction(ratio, direction, speed)
            
            case 'stop':
                // Send stop instruction
                sendInstruction(0, STOP, 0)
            default:
                console.error("Unknown message... this should never happen")
        }
    }

    return (
        <View style={styles.container}>
            <Joystick
                size={100} 
                sticky={true}
                baseColor='red'
                stickColor='blue'
                move={handleMove}
                start={handleMove}
                stop={handleMove}
                throttle={50}
            ></Joystick>
            {/* <Button 
                title='Forward'
                onPress={() => sendInstruction(FORWARD)}
            />
            <Button 
                title='Backward'
                onPress={() => sendInstruction(BACKWARD)}
            />
            <Button 
                title='STOP'
                onPress={() => sendInstruction(STOP)}
            /> */}
            {/* <Text>WiFi is Connected!</Text> */}
        </View>
    )
}

// Takes the coordinates of the joystick and builds a command to be transmitted to the rover
// Returns (power_ratio: number, direction: string, speed: number) tuple
const buildCommand = (x: number, y: number): [number, string, number] => {
    if (y == 0) {
        // return stop command
        return [0, STOP, 0]
    } else if (y > 0) {
        // build forward command
        return [x, FORWARD, 255*y]
    } else {
        // build backward command
        return [x, BACKWARD, -255*y]
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
