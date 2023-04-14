 <p align="center">
  <img width="" height="150" src="https://www.swng.org.au/wp-content/uploads/2019/07/top_logo-1.png">
</p>

# South West Networking Group Mobile App v2

Framework tools used
- create-expo-app
- ReactNative
- NodeJS

## Prerequisites
- Ensure that you have NodeJS installed on your device before running the project

## Downloading Steps (Multiple Options)
  - Download zip file from github website and open with vscode/ide
  - open remote directly in vscode/ide with github extension
  -  `git clone https://github.com/Peekaey/SWNG-Mobile-App` and enter github credentials in CLI

## Initialising project files (do before running)
- cd into project folder and `npm install` - creates node_modules folder and other files needed

## How to build/run the project
Make sure you first cd into the folder
- Android: `npm run android`
- IOS: `npm run ios`
- Web: `npm run web` Runs app as web server

### Opening the app
- Using Android/IOS device as the emulator
  - After the metro bundler is started, ensure that expo-go app is installed on either the IOS or android device and scan the QR code in the console.  
The expo-go app should then open and compile the project files after which the app should now function.

- Using on computer virtual emulator
  - For android, ensure that the android SDK is installed and a virtual device is created
    - Easiest way again is to use device manager in android studio
    
  - For IOS, ensure that Xcode is installed and working correctly

### Troubleshooting (Add if experiencing any)
1. Error messages related to missing android SDK when attempting to start the project
   1. Most likely missing the android SDK
      1. Download SDK Seperately (Easiest Way is to use Android Studio to download SDK)


2. Uncaught Error: java.net.ConnectException: Failed to connect to ......
   1. Networking Issue, troubleshooting steps you can do are:
      1. Physically Plug in a cable or make sure computer and phone are on the same network
      2. Ensure network is on trusted/private instead of public
      3. Check to make sure or open port 19000 or 190001 depending on which one you use (default 19000

3. Can't build/bundle app with IOS phone/emulator
   1. Check that Xcode is installed on the device
