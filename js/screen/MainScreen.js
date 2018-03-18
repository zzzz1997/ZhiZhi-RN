import React, { Component } from 'react';
import { View,
    Text,
    StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';
import TabNavigator from 'react-native-tab-navigator';
import HomePage from "../main/HomePage";

const HOME_TITLE = '主页';
const HOME_TAG = 'home';
const FIND_TITLE = '发现';
const FIND_TAG = 'eye';
const ADD_TITLE = '发布';
const ADD_TAG = 'md-add-circle';
const MESSAGE_TITLE = '消息';
const MESSAGE_TAG = 'message';
const USER_TITLE = '我';
const USER_TAG = 'user';

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {selectedTab: HOME_TAG}
    }

    _renderTabItem(title, tag, type, number, childView) {
        return (
            <TabNavigator.Item
                title={title}
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Icon name={tag} type={type} color={'#d5d5d5'}/>}
                renderSelectedIcon={() => <Icon name={tag} type={type} color={'#ff4500'}/>}
                badgeText={number}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.content}>
                <TabNavigator hidesTabTouch={true}>
                    {this._renderTabItem(HOME_TITLE, HOME_TAG, 'feather', 1, <HomePage navigate={navigate}/>)}
                    {this._renderTabItem(FIND_TITLE, FIND_TAG, 'feather', 0, <Text>Page 2</Text>)}
                    {this._renderTabItem(ADD_TITLE, ADD_TAG, 'ionicon', 0, <Text>Page 3</Text>)}
                    {this._renderTabItem(MESSAGE_TITLE, MESSAGE_TAG, 'entypo', 0, <Text>Page 4</Text>)}
                    {this._renderTabItem(USER_TITLE, USER_TAG, 'font-awesome', 0, <Text>Page 5</Text>)}
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    }
});