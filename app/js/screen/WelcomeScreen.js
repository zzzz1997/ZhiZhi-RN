import React from 'react';
import { View,
    Text,
    StyleSheet
} from 'react-native';

import { BasePage,
    Carousel,
    Button
} from 'teaset';

import MainScreen from "./MainScreen";

/**
 * 应用欢迎界面，在第一次进入应用时呈现给用户
 */
export default class WelcomeScreen extends BasePage {
    renderPage() {
        // 由若干图片组成跑马灯
        return(
            <Carousel style={styles.container}
                      carousel={false}
                control={<Carousel.Control/>}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                    <Button title='点击进入' onPress={() => {
                        this.navigator.replace({view: <MainScreen/>})
                    }} />
                </View>
            </Carousel>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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