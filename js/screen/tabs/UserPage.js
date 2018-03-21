import React from 'react';

import { BasePage, ListRow } from 'teaset'
import SettingScreen from "../SettingScreen";

export default class UserPage extends BasePage {
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