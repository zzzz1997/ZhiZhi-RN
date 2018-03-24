import React, { Component } from 'react';
import { TouchableWithoutFeedback,
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * 自定义图片按钮组件
 */
export default class ImageButton extends Component {
    // 组件参数
    static propTypes = {
        image: PropTypes.number.isRequired,
        text: PropTypes.string,
        tag: PropTypes.string,
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);
        // 绑定上下文
        this._onClick = this._onClick.bind(this);
    }

    /**
     * 点击事件回调
     * @private true
     */
    _onClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.text, this.props.tag);
        }
    }

    render() {
        return(
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={styles.container}>
                    <Image style={styles.image} source={this.props.image}/>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    image: {
        width: 38,
        height: 38,
        marginBottom: 2
    }
});