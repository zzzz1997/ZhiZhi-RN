import React from 'react';
import { View, StyleSheet } from 'react-native';

import { NavigationPage,
    Button,
    ListRow
} from 'teaset'

import SettingScreen from "../SettingScreen";
import LoginScreen from "../LoginScreen";

/**
 * 用户页面
 */
export default class UserPage extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '我',
        showBackButton: false
    };

    renderPage() {
        return(
            <View style={styles.container}>
                <View style={styles.buttonPanel}>
                    <Button
                        title={'登录'}
                        onPress={() => {
                            // 点击进入登录页面
                            this.navigator.push({view: <LoginScreen/>})
                        }}/>
                </View>
                <View style={styles.divider}/>
                <ListRow
                    title='设置'
                    style={{flex: 1}}
                    onPress={() => {
                        // 点击进入设置页面
                        this.navigator.push({view: <SettingScreen/>})
                    }}
                    topSeparator='full'
                    bottomSeparator='full' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonPanel: {
        paddingTop: 10,
        alignItems: 'center'
    },
    divider: {
        height: 10
    }
});