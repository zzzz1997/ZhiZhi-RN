import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { BasePage, TabView } from 'teaset';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import IconFA from 'react-native-vector-icons/FontAwesome';

import HomePage from "./tabs/HomePage";
import FindPage from "../../../ZhiZhi/js/screen/tabs/FindPage";
import MessagePage from "./tabs/MessagePage";
import UserPage from "./tabs/UserPage";

const HOME_TITLE = '主页';
const HOME_TAG = 'home';
const FIND_TITLE = '发现';
const FIND_TAG = 'eye';
const ADD_TAG = 'md-add-circle';
const MESSAGE_TITLE = '消息';
const MESSAGE_TAG = 'message';
const USER_TITLE = '我';
const USER_TAG = 'user';

export default class MainScreen extends BasePage {
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
                width: 70,
                height: 70,
                borderRadius: 35,
                shadowColor: '#ccc',
                shadowOffset: {height: -1},
                shadowOpacity: 0.5,
                shadowRadius: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <IconI name={ADD_TAG} size={50} color={global.theme.primaryColor}/>
            </View>
        );
        return(
            <TabView style={styles.container} barStyle={customBarStyle} type={'projector'}>
                <TabView.Sheet
                    title={HOME_TITLE}
                    icon={<IconF name={HOME_TAG} size={26} color={global.theme.tvBarBtnIconTintColor}/>}
                    activeIcon={<IconF name={HOME_TAG} size={26} color={global.theme.primaryColor}/>}
                    badge={1}>
                    <HomePage/>
                </TabView.Sheet>

                <TabView.Sheet
                    title={FIND_TITLE}
                    icon={<IconF name={FIND_TAG} size={26} color={global.theme.tvBarBtnIconTintColor}/>}
                    activeIcon={<IconF name={FIND_TAG} size={26} color={global.theme.primaryColor}/>}>
                    <FindPage/>
                </TabView.Sheet>

                <TabView.Sheet
                    type={'button'}
                    icon={bigIcon}
                    iconContainerStyle={{justifyContent: 'flex-end'}}
                    onPress={() => alert('Custom button press')}/>

                <TabView.Sheet
                    title={MESSAGE_TITLE}
                    icon={<IconE name={MESSAGE_TAG} size={26} color={global.theme.tvBarBtnIconTintColor}/>}
                    activeIcon={<IconE name={MESSAGE_TAG} size={26} color={global.theme.primaryColor}/>}>
                    <MessagePage/>
                </TabView.Sheet>

                <TabView.Sheet
                    title={USER_TITLE}
                    icon={<IconFA name={USER_TAG} size={26} color={global.theme.tvBarBtnIconTintColor}/>}
                    activeIcon={<IconFA name={USER_TAG} size={26} color={global.theme.primaryColor}/>}>
                    <UserPage/>
                </TabView.Sheet>
            </TabView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});