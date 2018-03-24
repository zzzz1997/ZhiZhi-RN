import React from 'react';

import { NavigationPage,
    ListRow
} from 'teaset'
import SettingScreen from "../SettingScreen";

/**
 * 用户页面
 */
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
                    // 点击进入设置页面
                    this.navigator.push({view: <SettingScreen/>})
                }}
                topSeparator='full'
                bottomSeparator='full' />
        )
    }
}