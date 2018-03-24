import React, { Component } from 'react';
import {StyleSheet,
    View,
    Alert } from 'react-native';

import Barcode from 'react-native-smart-barcode'

/**
 * 扫描页面
 */
export default class ScanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 扫描界面显示控制
            viewAppear: false,
        };
    }

    componentDidMount() {
        //启动定时器
        this.timer = setTimeout(() => {
            this.setState({viewAppear: true})
        }, 250);
    }

    componentWillUnmount() {
        // 清除定时器
        this.timer && clearTimeout(this.timer);
    }

    /**
     * 扫描结果处理
     *
     * @param e 扫面结果
     * @private true
     */
    onBarCodeRead = (e) => {
        this._stopScan();
        Alert.alert("二维码", e.nativeEvent.data.code, [
            {text: '确认', onPress: () => this._startScan()},
        ])
    };

    /**
     * 开始扫描
     *
     * @private
     */
    _startScan = () => {
        this._barCode.startScan()
    };

    /**
     * 停止扫描
     * @private true
     */
    _stopScan = () => {
        this._barCode.stopScan()
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.viewAppear
                    ? <Barcode
                        style={styles.barCode}
                        ref={component => this._barCode = component}
                        onBarCodeRead={this.onBarCodeRead}/>
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    barCode: {
        flex: 1
    }
});