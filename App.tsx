import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const WIFI_SSID = "esp32-wifi"
const WIFI_PASS = "abc123"

export default function App() {
    const [isConnected, setIsConnected] = React.useState(false)
    // https://github.com/JuanSeBestia/react-native-wifi-reborn
    const connect = async () => {
        await WifiManager.connectToProtectedSSID(WIFI_SSID, WIFI_PASS, false).then(onConnectSuccess, onConnectFail)
    }

    useEffect(() => {
        connect()
    }, [])

    const onConnectSuccess = () => {
        setIsConnected(true)
    }
    
    const onConnectFail = () => {
        setIsConnected(false)
    }

    if (isConnected) {
        return (
            <View style={styles.container}>
                <Text>WiFi is Connected!</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>Unable to connect to WiFi</Text>
            </View>
        )
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
