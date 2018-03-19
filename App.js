import React, { Component } from "react";

import { TeaNavigator, Theme } from 'teaset'

import SplashScreen from "./js/screen/SplashScreen";

Theme.set({fitIPhoneX:true});

export default class App extends Component<{}> {
    render() {
        return <TeaNavigator rootView={<SplashScreen/>}/>;
    }
}