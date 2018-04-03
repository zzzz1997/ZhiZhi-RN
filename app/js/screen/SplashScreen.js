import React from 'react';
import { View,
    Text,
    StyleSheet
} from 'react-native';

import { BasePage,
    Theme,
    Toast
} from 'teaset';

import MyStorage from "../utils/MyStorage";
import WelcomeScreen from "./WelcomeScreen";
import MainScreen from "./MainScreen";
import DefaultTheme from "../theme/DefaultTheme";
import TestTheme from "../theme/TestTheme";

// 定时器时间
const SPLASH_TIME = 2000;
// 默认主题
global.theme = DefaultTheme;

/**
 * 根路由
 *
 * 加载存储设置，初始化参数
 */
export default class SplashScreen extends BasePage {
    onDidFocus() {
        // 设置定时器，一定时间内跳转进入应用
        this.timer = setTimeout(() => {
            // 初始化获得存储对象
            MyStorage._getInstance();
            // 加载主题设置
            MyStorage._load('theme', (themeText) => {
                Toast.message(themeText);
                // 初始化主题
                if(themeText === 'test'){
                    global.theme = TestTheme;
                    Theme.set(theme)
                } else {
                    Theme.set(theme)
                }
            });
            // 加载初始化数据
            MyStorage._load('isInit', (isInit) => {
                // 第一次进入应用先进入欢迎界面
                if (!isInit) {
                    this.navigator.replace({view: <WelcomeScreen/>});
                    MyStorage._save('isInit', true)
                } else {
                    this.navigator.replace({view: <MainScreen/>})
                }
            })
        }, SPLASH_TIME);
    }

    componentWillUnmount() {
        // 清除定时器
        clearTimeout(this.timer);
    }

    renderPage() {
        // 初始化界面，由一张图片组成
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