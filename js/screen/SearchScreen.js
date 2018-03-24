import React from 'react';

import { BasePage,
    SearchInput
} from 'teaset'

/**
 * 搜索页面
 */
export default class SearchScreen extends BasePage {
    onDidFocus() {
        this.search.focus()
    }

    renderPage() {
        return(
            <SearchInput style={{width: 200}}
                         placeholder='找工作'
                         ref={search => this.search = search}/>
        )
    }
}