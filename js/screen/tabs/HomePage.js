import React from 'react';
import { ScrollView, View, Platform, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { BasePage, SearchInput, Carousel, Label, Toast, Theme } from 'teaset';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchScreen from "../SearchScreen";
import ImageButton from "../../common/ImageButton";
import ScanScreen from "../ScanScreen";

export default class HomePage extends BasePage {
    renderPage() {
        return(
            <ScrollView style={styles.container}>
                <View
                    style={{flexDirection: 'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: Platform.OS === 'ios' ? 20 : 0,
                        height: Platform.OS === 'ios' ? 68 : 48,
                        backgroundColor: Theme.primaryColor,
                        alignItems: 'center'}}>
                    <View style={styles.headBar}>
                        <View style={styles.location}>
                            <Label>昆明</Label>

                            <IconE name={'location'} color={global.theme.tvBarBtnIconTintColor} size={18}/>
                        </View>

                        <SearchInput
                            style={styles.searchBar}
                            placeholder='找工作'
                            onFocus={() => {
                                this.navigator.push({view: <SearchScreen/>})
                            }}/>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                Toast.message('dianji');
                                this.navigator.push({view: <ScanScreen/>})
                            }}>
                            <IconM name={'qrcode-scan'} color={global.theme.tvBarBtnIconTintColor} size={26}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <Carousel
                    style={styles.carousel}
                    control={<Carousel.Control
                        style={{alignItems: 'flex-end'}}
                        dot={<Text style={styles.dot}>☆</Text>}
                        activeDot={<Text style={styles.activeDot}>★</Text>}/>}>
                    <View style={styles.slide1}>
                        <Image source={require('../../../img/dyp.png')}/>
                    </View>

                    <View style={styles.slide2}>
                        <Label style={styles.text}>Beautiful</Label>
                    </View>

                    <View style={styles.slide3}>
                        <Label style={styles.text}>And simple</Label>
                    </View>
                </Carousel>
                
                <ImageButton image={require('../../../img/dyp.png')}
                    text={'电影票'}
                    tag={'test'}
                    onClick={(title, tag) => {
                        Toast.message(title + tag)
                }}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headBar: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingRight: 3
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5
    },
    searchBar: {
        flex: 1,
        marginEnd: 3
    },
    carousel: {
        height: 200
    },
    dot: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: '#5bc0de',
        padding: 4
    },
    activeDot: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: '#5bc0de',
        padding: 4
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
    text: {
        fontSize: 20
    }
});