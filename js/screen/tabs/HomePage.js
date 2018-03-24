import React from 'react';
import { View,
    Platform,
    Text,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { NavigationPage,
    SearchInput,
    Carousel,
    Label,
    Toast,
    Theme
} from 'teaset';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {PullView} from 'react-native-pull';

import SearchScreen from "../SearchScreen";
import ImageButton from "../../common/ImageButton";
import ScanScreen from "../ScanScreen";
import LocationScreen from "../LocationScreen";

/**
 * 主页页面
 */
export default class HomePage extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '主页',
        showBackButton: false
    };

    constructor(props) {
        super(props);

        this.state = {
            // 当前走马灯位置
            carouselIndex: 0
        }
    }

    /**
     * 下拉刷新
     * @param resolve 刷新结束方法
     */
    onPullRelease(resolve) {
        Toast.message('刷新成功');
        setTimeout(() => {
            resolve()
        }, 3000);
    };

    renderPage() {
        return(
            <View style={styles.container}>
                <View
                    style={{flexDirection: 'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: Platform.OS === 'ios' ? 20 : 0,
                        height: Platform.OS === 'ios' ? 68 : 48,
                        backgroundColor: Theme.primaryColor,
                        alignItems: 'center'}}>
                    <View style={styles.headBar}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                // 点击进入城市选择页面
                                this.navigator.push({view: <LocationScreen/>})
                            }}>
                            <View style={styles.location}>
                                <Label>昆明</Label>

                                <IconE name={'location'} color={global.theme.tvBarBtnIconTintColor} size={18}/>
                            </View>
                        </TouchableWithoutFeedback>

                        <SearchInput
                            style={styles.searchBar}
                            placeholder='找工作'
                            onFocus={() => {
                                // 点击进入搜索页面
                                this.navigator.push({view: <SearchScreen/>})
                            }}/>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                // 点击进入扫描页面
                                this.navigator.push({view: <ScanScreen/>})
                            }}>
                            <IconM name={'qrcode-scan'} color={global.theme.tvBarBtnIconTintColor} size={26}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <PullView onPullRelease={this.onPullRelease}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            // 走马灯点击事件
                            Toast.message(this.state.carouselIndex)
                        }}>
                        <Carousel
                            style={styles.carousel}
                            control={<Carousel.Control
                                style={{alignItems: 'flex-end'}}
                                dot={<Text style={styles.dot}>☆</Text>}
                                activeDot={<Text style={styles.activeDot}>★</Text>}/>}
                            onChange={(index) => {
                                // 走马灯滑动监听，设置state，便于处理点击事件
                                this.setState({carouselIndex: index})
                            }}>
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
                    </TouchableOpacity>

                    <ImageButton image={require('../../../img/dyp.png')}
                                 text={'电影票'}
                                 tag={'test'}
                                 onClick={(title, tag) => {
                                     Toast.message(title + tag)
                                 }}/>
                </PullView
>
            </View>
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