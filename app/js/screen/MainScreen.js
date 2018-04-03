import React from 'react';
import {Platform,
    View,
    TouchableOpacity,
    Animated,
    BackHandler,
    ToastAndroid,
    StyleSheet,
    Dimensions
} from 'react-native';

import { BasePage,
    TabView
} from 'teaset';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import IconFA from 'react-native-vector-icons/FontAwesome';

import HomePage from "./tabs/HomePage";
import FindPage from "./tabs/FindPage";
import MessagePage from "./tabs/MessagePage";
import UserPage from "./tabs/UserPage";

// 主页标题
const HOME_TITLE = '主页';
// 主页图标标志
const HOME_TAG = 'home';
// 发现标题
const FIND_TITLE = '发现';
// 发现图标标志
const FIND_TAG = 'eye';
// 添加图标标志
const ADD_TAG = 'md-add-circle';
// 消息标题
const MESSAGE_TITLE = '消息';
// 消息图标标志
const MESSAGE_TAG = 'message';
// 用户标题
const USER_TITLE = '我';
// 用户图标标志
const USER_TAG = 'user';
// 取消图标标志
const CANCEL_TAG = 'md-add';

// 普通图标大小
const ICON_SIZE = 26;
// 中心按钮大小
const CENTER_VIEW_SIZE = 70;
// 中心图标大小
const BIG_ICON_SIZE = 50;

// 动画执行的时间
const ANIMATED_TIME = 500;

// 获取屏幕宽度及高度
const {width, height} = Dimensions.get('window');

// 新建动画初始值
const publishValue = new Animated.Value(0);
// 利用interpolate映射状态值，发布视图
const publish = publishValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, height / 12]
});

// 取消按钮的控制值
const cancelValue = new Animated.Value(0);
// 取消按钮的映射
const cancel = cancelValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '225deg']
});

// 记录最后一次点击返回键的时间
let lastBack = 0;

/**
 * 主活动页面
 */
export default class MainScreen extends BasePage {
    constructor(props) {
        super(props);

        // 监听Android返回键点击事件
        BackHandler.addEventListener('hardwareBackPress', () => {
            // 如果处在浮层中，关闭浮层
            if(this.state.isPublish){
                this.removePublishView();
                return true
            }

            // 如果两次点击间隔小与2000毫秒
            if((lastBack + 2000) > Date.now()) {
                // 退出应用
                BackHandler.exitApp();
                return false
            }

            //记录点击时间
            lastBack = Date.now();
            ToastAndroid.show('再按返回退出应用', ToastAndroid.SHORT);

            return true
        });

        this.state = {
            // 判断是否处在浮层中
            isPublish: false
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            // 移除监听器
            BackHandler.removeEventListener('hardwareBackPress',()=>{});
        }
    }

    /**
     * 新建发布视图
     */
    addPublishView() {
        // 初始化状态值
        publishValue.setValue(0);
        cancelValue.setValue(0);

        // 控制视图显示
        this.setState({isPublish: true});

        // 同步运行动画
        Animated.parallel([
            Animated.timing(publishValue, {
                toValue: 1,
                duration: ANIMATED_TIME
            }),
            Animated.timing(cancelValue, {
                toValue: 1,
                duration: ANIMATED_TIME
            })
        ]).start();
    }

    /**
     * 移除发布视图
     */
    removePublishView() {
        // 初始化状态值
        publishValue.setValue(1);
        cancelValue.setValue(1);

        // 同步运行动画
        Animated.parallel([
            Animated.timing(publishValue, {
                toValue: 0,
                duration: ANIMATED_TIME
            }),
            Animated.timing(cancelValue, {
                toValue: 0,
                duration: ANIMATED_TIME
            })
        ]).start();

        setTimeout(() => {
            this.setState({isPublish: false})
        }, ANIMATED_TIME - 10);
    }

    renderPage() {
        let customBarStyle = Platform.OS === 'android'  ? null : {
            borderTopWidth: 0,
            shadowColor: '#ccc',
            shadowOffset: {height: -1},
            shadowOpacity: 0.4,
            shadowRadius: 0.5,
        };
        let bigIcon = (
            <View style={{
                width: CENTER_VIEW_SIZE,
                height: CENTER_VIEW_SIZE,
                borderRadius: CENTER_VIEW_SIZE / 2,
                shadowColor: '#ccc',
                shadowOffset: {height: -1},
                shadowOpacity: 0.5,
                shadowRadius: 0.5,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <IconI name={ADD_TAG} size={BIG_ICON_SIZE} color={global.theme.primaryColor}/>
            </View>
        );
        return(
            <View style={styles.container}>
                <TabView style={styles.container} barStyle={customBarStyle} type={'projector'}>
                    <TabView.Sheet
                        title={HOME_TITLE}
                        icon={<IconF name={HOME_TAG} size={ICON_SIZE} color={global.theme.tvBarBtnIconTintColor}/>}
                        activeIcon={<IconF name={HOME_TAG} size={ICON_SIZE} color={global.theme.primaryColor}/>}
                        badge={1}>
                        <HomePage/>
                    </TabView.Sheet>

                    <TabView.Sheet
                        title={FIND_TITLE}
                        icon={<IconF name={FIND_TAG} size={ICON_SIZE} color={global.theme.tvBarBtnIconTintColor}/>}
                        activeIcon={<IconF name={FIND_TAG} size={ICON_SIZE} color={global.theme.primaryColor}/>}>
                        <FindPage/>
                    </TabView.Sheet>

                    <TabView.Sheet
                        type={'button'}
                        icon={bigIcon}
                        iconContainerStyle={styles.iconContainer}
                        onPress={this.addPublishView.bind(this)}/>

                    <TabView.Sheet
                        title={MESSAGE_TITLE}
                        icon={<IconE name={MESSAGE_TAG} size={ICON_SIZE} color={global.theme.tvBarBtnIconTintColor}/>}
                        activeIcon={<IconE name={MESSAGE_TAG} size={ICON_SIZE} color={global.theme.primaryColor}/>}>
                        <MessagePage/>
                    </TabView.Sheet>

                    <TabView.Sheet
                        title={USER_TITLE}
                        icon={<IconFA name={USER_TAG} size={ICON_SIZE} color={global.theme.tvBarBtnIconTintColor}/>}
                        activeIcon={<IconFA name={USER_TAG} size={ICON_SIZE} color={global.theme.primaryColor}/>}>
                        <UserPage/>
                    </TabView.Sheet>
                </TabView>

                {this.state.isPublish
                    ? <Animated.View style={styles.publish}>
                        </Animated.View>
                    : null}

                {this.state.isPublish
                    ? <Animated.View style={styles.cancel}>
                            <TouchableOpacity onPress={this.removePublishView.bind(this)}>
                            <IconI name={CANCEL_TAG} size={ICON_SIZE}/>
                            </TouchableOpacity>
                        </Animated.View>
                    : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    iconContainer: {
        justifyContent: 'flex-end'
    },
    publish: {
        position: 'absolute',
        transform: [{
            scale: publish
        }],
        backgroundColor: '#123456',
        borderRadius: ICON_SIZE / 2,
        height: ICON_SIZE,
        width: ICON_SIZE,
        top: height - (CENTER_VIEW_SIZE + 2) / 2 - ICON_SIZE / 2,
        bottom: (CENTER_VIEW_SIZE + 2) / 2 - ICON_SIZE / 2,
        left: width / 2 - ICON_SIZE / 2,
        right: width / 2 - ICON_SIZE / 2
    },
    cancel: {
        position: 'absolute',
        alignItems: 'center',
        transform: [{rotate: cancel}],
        top: height - (CENTER_VIEW_SIZE + 2) / 2 - ICON_SIZE / 2,
        bottom: (CENTER_VIEW_SIZE + 2) / 2 - ICON_SIZE / 2,
        left: width / 2 - ICON_SIZE / 2,
        right: width / 2 - ICON_SIZE / 2
    }
});