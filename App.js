import React, { Component } from "react";

import { TeaNavigator, Theme } from 'teaset'

import DefaultTheme from "./js/theme/DefaultTheme";
import SplashScreen from "./js/screen/SplashScreen";

const theme = DefaultTheme;
Theme.set(theme);

export default class App extends Component {
    render() {
        return <TeaNavigator rootView={<SplashScreen/>}/>;
    }
}