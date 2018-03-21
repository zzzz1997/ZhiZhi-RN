import React from 'react';

import { NavigationPage, ListRow } from 'teaset'
import SettingScreen from "../SettingScreen";

export default class UserPage extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '我',
        showBackButton: false
    };

    renderPage() {
        return(
            <ListRow
                title='设置'
                onPress={() => {
                    this.navigator.push({view: <SettingScreen/>})
                }}
                topSeparator='full'
                bottomSeparator='full' />
        )
    }
}