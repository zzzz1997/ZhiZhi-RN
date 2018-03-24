import React, { Component } from "react";

import { TeaNavigator } from 'teaset'

import SplashScreen from "./js/screen/SplashScreen";

/**
 * 应用入口类
 */
export default class App extends Component {
    render() {
        // 定义导航器TeaNavigator，设置根路由SplashScreen
        return <TeaNavigator rootView={<SplashScreen/>}/>;
    }
}