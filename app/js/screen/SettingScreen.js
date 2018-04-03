import React from 'react';

import { NavigationPage,
    ListRow,
    PullPicker,
    Theme
} from 'teaset'
import DefaultTheme from "../theme/DefaultTheme";
import TestTheme from "../theme/TestTheme";
import MyStorage from "../utils/MyStorage";

// 现有主题组
const themes = {
    default: DefaultTheme,
    test: TestTheme
};

/**
 * 设置页面
 */
export default class SettingScreen extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '设置',
        showBackButton: true
    };

    /**
     * 更改主题
     */
    changeTheme() {
        PullPicker.show(
            '选择主题',
            Object.keys(themes),
            -1,
            (item, index) => {
                Theme.set(themes[item]);
                global.theme = themes[item];
                // 获取存储对象
                MyStorage._getInstance();
                // 存储当前主题
                MyStorage._save('theme', item, null);
                this.navigator.pop();
            }
        );
    }

    renderPage() {
        return(
            <ListRow
                title='选择主题'
                onPress={() => {
                    this.changeTheme()
                }}
                topSeparator='full'
                bottomSeparator='full' />
        )
    }
}