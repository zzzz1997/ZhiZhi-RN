import React from 'react';

import { NavigationPage,
    Label
} from 'teaset'

/**
 * 消息页面
 */
export default class MessagePage extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '消息',
        showBackButton: false
    };

    renderPage() {
        return(
            <Label>MessagePage</Label>
        )
    }
}