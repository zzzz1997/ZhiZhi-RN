import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { BasePage, TabView } from 'teaset';
import HomePage from "./tabs/HomePage";
import FindPage from "../../../ZhiZhi/js/screen/tabs/FindPage";
import MessagePage from "./tabs/MessagePage";
import UserPage from "./tabs/UserPage";

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

export default class MainScreen extends BasePage {
    renderPage() {
        let customBarStyle = Platform.OS === 'android'  ? null : {
            borderTopWidth: 0,
            shadowColor: '#ccc',
            shadowOffset: {height: -1},
            shadowOpacity: 0.4,
            shadowRadius: 0.5,
        };
        return(
            <TabView style={styles.container} barStyle={customBarStyle} type={'projector'}>
                <TabView.Sheet title={HOME_TITLE}
                    badge={1}>
                    <HomePage/>
                </TabView.Sheet>

                <TabView.Sheet title={FIND_TITLE}>
                    <FindPage/>
                </TabView.Sheet>

                <TabView.Sheet
                    type={'button'}
                    title={ADD_TITLE}
                    iconContainerStyle={{justifyContent: 'flex-end'}}
                    onPress={() => alert('Custom button press')}/>

                <TabView.Sheet title={MESSAGE_TITLE}>
                    <MessagePage/>
                </TabView.Sheet>

                <TabView.Sheet title={USER_TITLE}>
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