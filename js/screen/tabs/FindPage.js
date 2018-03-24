import React from 'react';

import { NavigationPage,
    Label
} from 'teaset'

/**
 * 发现页面
 */
export default class FindPage extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '发现',
        showBackButton: false
    };

    renderPage() {
        return(
            <Label>FindPage</Label>
        )
    }
}