import React from 'react';

import { NavigationPage,
    SearchInput
} from 'teaset'

/**
 * 搜索页面
 */
export default class SearchScreen extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '搜你所想',
        showBackButton: true
    };

    onDidFocus() {
        // 聚焦搜索框
        this.search.focus()
    }

    renderPage() {
        return(
            <SearchInput
                style={{width: 200}}
                placeholder='找工作'
                ref={search => this.search = search}/>
        )
    }
}