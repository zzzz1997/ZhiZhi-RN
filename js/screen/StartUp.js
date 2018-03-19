import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyStorage from "../utils/MyStorage";

export default class StartUp extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        const { navigate } = this.props.navigation;

        this.timer = setTimeout(() => {
            MyStorage._getInstance();
            MyStorage._load('isInit', null, null, (isInit) => {
                if (!isInit) {
                    navigate('SplashScreen');
                    MyStorage._save('isInit', true)
                } else {
                    navigate('Tabs')
                }
            })
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return(
            <View style={styles.welcome}>
                <Text style={styles.text}>Welcome!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
});