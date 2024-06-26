
---

# React Native Mobile Application

This repository contains a mobile application developed in React Native as part of the Senior React Native Developer Test Task.

## Overview

The application consists of three screens and a bottom menu, designed to fulfill the following requirements:

1. **First Screen: IP Address and ISP Provider Detection**
   - Displays the current user's IP address and ISP provider upon app launch.
   - Includes a form field to manually enter an IP address and fetch corresponding ISP provider and address using the [IPWhois API](https://ipwho.is/).
   - Features a slider of multiple images where selecting an image passes it to the second screen.

2. **Second Screen: Display IP Data and Selected Image**
   - Shows the data obtained based on the IP address entered on the first screen.
   - Displays the image selected from the slider on the first screen.

3. **Third Screen: Real-Time Market Data**
   - Provides real-time market data for a ticker (e.g., "BTCUSDT") using the [Tiingo Websockets API](https://www.tiingo.com/documentation/websockets/forex).

## Requirements

- React Native version >= 0.72
- React Navigation version >= 6
- TypeScript
- Code separation into components

## Installation

### Prerequisites

Make sure you have Node.js and npm installed. You'll also need an Android emulator or device for testing.

### Steps to Run Locally (Android)

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Metro Bundler:
   ```bash
   npx react-native start
   ```

4. Run the app on Android:
   ```bash
   npx react-native run-android
   ```

## APK Build

- Link to the APK build: [APK Link](https://drive.google.com/file/d/1HDRxJhEnajacviREOJj0DkrRCRZ2aIzP/view?usp=drive_link)

## Orientation

The application is designed for portrait/vertical orientation. Landscape/horizontal orientation is disabled.

## Additional Information

- For any questions or clarifications regarding the task, please contact sharma.ajay.5057@gmail.com.

---
