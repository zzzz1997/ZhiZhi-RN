import React from 'react';
import { View,
    DeviceEventEmitter,
    ToastAndroid,
    NativeModules,
    StyleSheet
} from 'react-native';

import { NavigationPage,
    Label,
    Input,
    Button
} from 'teaset';

/**
 * 登录页面
 */
export default class LoginScreen extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '登录',
        showBackButton: true
    };

    componentDidMount() {
        // 注册监听器
        DeviceEventEmitter.addListener('userJson', (json) => {
            ToastAndroid.show(json, ToastAndroid.SHORT);
            //this.setState({text: msg})
        })
    }

    static toLogin() {
        // 登录操作
        NativeModules.userModule.login('测试', "123456");
    }

    renderPage() {
        return(
            <View style={styles.container}>
                <Label text={'用户名'}/>
                <Input secureTextEntry={false}/>

                <Label text={'密码'}/>
                <Input secureTextEntry={true}/>

                <Button
                    title={'登录'}
                    onPress={() => LoginScreen.toLogin()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});