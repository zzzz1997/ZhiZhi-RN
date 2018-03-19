import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

import { BasePage, SearchInput, Carousel, Label, Toast } from 'teaset'

import SearchScreen from "../SearchScreen";
import ImageButton from "../../common/ImageButton";

export default class HomePage extends BasePage {
    renderPage() {
        return(
            <ScrollView style={styles.container}>
                <SearchInput style={{width: 200}}
                             placeholder='找工作'
                             onFocus={() => {
                                 this.navigator.push({view: <SearchScreen/>})
                             }}/>

                <Carousel style={styles.carousel}
                          control={<Carousel.Control
                              style={{alignItems: 'flex-end'}}
                              dot={<Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#5bc0de', padding: 4}}>☆</Text>}
                              activeDot={<Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#5bc0de', padding: 4}}>★</Text>}/>}>
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
    carousel: {
        height: 200
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