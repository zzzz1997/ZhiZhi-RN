import React, { Component } from 'react';
import { TouchableWithoutFeedback,
    View,
    Image,
    Text,
    StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ImageButton extends Component {
    static propTypes = {
        image: PropTypes.number.isRequired,
        text: PropTypes.string,
        tag: PropTypes.string,
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

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