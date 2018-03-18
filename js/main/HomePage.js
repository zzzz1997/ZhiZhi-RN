import React, { Component } from 'react';
import { View,
    Text,
    TextInput,
    StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-easy-toast';
import PropTypes from 'prop-types';
import ImageButton from "../common/ImageButton";

export default class HomePage extends Component {
    static propTypes = {
        navigate: PropTypes.object
    };

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.header}>
                        <Text style={styles.location}>昆明</Text>
                        <Icon name={'location'}
                              type={'evilicon'}
                              color={'#d5d5d5'}/>
                        <Icon name={'search'}
                              color={'#d5d5d5'}
                              containerStyle={styles.searchIcon}/>
                        <TextInput style={styles.textInput}
                                   underlineColorAndroid='transparent'
                                   placeholder={'找工作'}
                                   onFocus={() => {
                                       this.props.navigate('SearchScreen')
                                   }}/>
                        <Icon name={'qrcode-scan'}
                              type={'material-community'}
                              color={'#d5d5d5'}
                              containerStyle={styles.scanIcon}/>
                    </View>

                </View>

                <Swiper style={styles.wrapper} height={200} horizontal={true} autoplay>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>

                <View style={styles.imageButtonGroup}>
                    <ImageButton image={require('../../img/dyp.png')}
                                 text={'测试'}
                                 tag={'test'}
                                 onClick={(title, tag) => {
                                     this.toast.show(title + tag)
                                 }}/>
                </View>

                <Toast ref={toast => this.toast = toast}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 300
    },
    content: {
        backgroundColor: 'orangered',
        height: 50
    },
    header: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        margin: 10
    },
    location: {
        paddingStart: 20
    },
    searchIcon: {
        paddingStart: 5
    },
    textInput: {
        flex: 1,
        padding: 0
    },
    scanIcon: {
        marginEnd: 5
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text:{
        fontSize: 20
    },
    imageButtonGroup: {
        flexDirection: 'row',
        height: 60
    }
});