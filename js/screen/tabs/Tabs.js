import React from 'react'

import { TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';

import HomePage from "./HomePage";
import FindPage from "./FindPage";
import AddPage from "./AddPage";
import MessagePage from "./MessagePage";
import UserPage from "./UserPage";

const HOME_TITLE = '主页';
const HOME_TAG = 'home';
const HOME_TYPE = 'feather';
const FIND_TITLE = '发现';
const FIND_TAG = 'eye';
const FIND_TYPE = 'feather';
const ADD_TITLE = '发布';
const ADD_TAG = 'md-add-circle';
const ADD_TYPE = 'ionicon';
const MESSAGE_TITLE = '消息';
const MESSAGE_TAG = 'message';
const MESSAGE_TYPE = 'entypo';
const USER_TITLE = '我';
const USER_TAG = 'user';
const USER_TYPE = 'font-awesome';

const Tabs = TabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            badge: '1',
            header: null,
            tabBarLabel: HOME_TITLE,
            tabBarIcon: ({tintColor}) =>
                <Icon name={HOME_TAG} type={HOME_TYPE} color={tintColor}/>
        }
    },
    FindPage: {
        screen: FindPage,
        navigationOptions: {
            header: null,
            tabBarLabel: FIND_TITLE,
            tabBarIcon: ({tintColor}) =>
                <Icon name={FIND_TAG} type={FIND_TYPE} color={tintColor}/>
        }
    },
    AddPage: {
        screen: AddPage,
        navigationOptions: {
            header: null,
            tabBarLabel: ADD_TITLE,
            tabBarIcon: ({tintColor}) =>
                <Icon name={ADD_TAG} type={ADD_TYPE} color={tintColor}/>
        }
    },
    MessagePage: {
        screen: MessagePage,
        navigationOptions: {
            header: null,
            tabBarLabel: MESSAGE_TITLE,
            tabBarIcon: ({tintColor}) =>
                <Icon name={MESSAGE_TAG} type={MESSAGE_TYPE} color={tintColor}/>
        }
    },
    UserPage: {
        screen: UserPage,
        navigationOptions: {
            header: null,
            tabBarLabel: USER_TITLE,
            tabBarIcon: ({tintColor}) =>
                <Icon name={USER_TAG} type={USER_TYPE} color={tintColor}/>
        }
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    backBehavior: true,
    tabBarOptions: {
        showIcon: true,
        activeTintColor: '#ff4500',
        inactiveTintColor: '#d5d5d5',
        style: {
            backgroundColor: 'white',
            height: 60,
        },
        indicatorStyle: {
            height: 0
        }
    }
});

export default Tabs;