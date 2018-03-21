import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { BasePage, Theme, Toast } from 'teaset';

import MyStorage from "../utils/MyStorage";
import WelcomeScreen from "./WelcomeScreen";
import MainScreen from "./MainScreen";
import DefaultTheme from "../theme/DefaultTheme";
import TestTheme from "../theme/TestTheme";

global.theme = DefaultTheme;

export default class SplashScreen extends BasePage {
    onDidFocus() {
        this.timer = setTimeout(() => {
            MyStorage._getInstance();
            MyStorage._load('theme', null, null, (themeText) => {
                Toast.message(themeText);
                if(themeText === 'test'){
                    global.theme = TestTheme;
                    Theme.set(theme)
                } else {
                    Theme.set(theme)
                }
            });
            MyStorage._load('isInit', null, null, (isInit) => {
                if (!isInit) {
                    this.navigator.push({view: <WelcomeScreen/>});
                    MyStorage._save('isInit', true, null)
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
                <Text style={{fontSize: 80}}>Welcome!</Text>
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