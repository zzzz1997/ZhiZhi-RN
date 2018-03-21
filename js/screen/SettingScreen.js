import React from 'react';

import { BasePage, ListRow, PullPicker, Theme } from 'teaset'
import DefaultTheme from "../theme/DefaultTheme";
import TestTheme from "../theme/TestTheme";
import MyStorage from "../utils/MyStorage";

const themes = {
    default: DefaultTheme,
    test: TestTheme
};

export default class SettingScreen extends BasePage {
    changeTheme() {
        PullPicker.show(
            '选择主题',
            Object.keys(themes),
            -1,
            (item, index) => {
                Theme.set(themes[item]);
                global.theme = themes[item];
                MyStorage._getInstance();
                MyStorage._save('theme', item, null);
                this.navigator.pop();
            }
        );
    }

    renderPage() {
        return(
            <ListRow
                title='Select theme'
                onPress={() => {
                    this.changeTheme()
                }}
                topSeparator='full'
                bottomSeparator='full' />
        )
    }
}