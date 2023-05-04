# Rover Controller
This repository contains the code used in the remote controller for the EGEN-310 rover. The controller
is a mobile application that communicates with the ESP-32 WiFi module via HTTP/TCP. 

The React Native and Expo frameworks were used build this mobile application. These frameworks allow the developer
to write one piece of code that can be compiled for iOS or Andriod devices.

## Getting Started

Before you can build the application on your own, you must install the Expo CLI and Expo Go (mobile emulator). 
The link for installing them and their dependencies are given below.
- [https://docs.expo.dev/get-started/installation/](Expo CLI)
- [https://docs.expo.dev/get-started/expo-go/](Expo Go)

Once you have both programs completed, you can install the project's dependencies by running:
```bash
yarn
```

This will use yarn to install all dependencies required by the app. If you do not already have yarn installed, 
you may do so by running:
```bash
npm install yarn
```

After the dependencies are installed, you can start the project by running the following command:
```bash
yarn start
```

In your bash instance, you should see a QR code that you should scan on your mobile device with Expo Go installed.
The controller app will build on your phone, and can be reloaded to display new changed without repeating the process above.

