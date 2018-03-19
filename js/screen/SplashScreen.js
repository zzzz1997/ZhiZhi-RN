import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { BasePage } from 'teaset';

import MyStorage from "../utils/MyStorage";
import WelcomeScreen from "./WelcomeScreen";
import MainScreen from "./MainScreen";

export default class SplashScreen extends BasePage {
    onDidFocus() {
        this.timer = setTimeout(() => {
            MyStorage._getInstance();
            MyStorage._load('isInit', null, null, (isInit) => {
                if (!isInit) {
                    this.navigator.push({view: <WelcomeScreen/>});
                    MyStorage._save('isInit', true)
                } else {
                    this.navigator.push({view: <MainScreen/>})
                }
            })
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    renderPage() {
        return(
            <View style={styles.container}>
                <Text>Welcome!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});