import React, { Component } from 'react';
import { View } from 'react-native';

import { SearchBar } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

export default class SearchScreen extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.search.focus()
    }

    render() {
        return(
            <View>
                <SearchBar
                    showLoadingIcon
                    onChangeText={() => {
                        this.toast.show('onChangeText')
                    }}
                    onClearText={() => {
                        this.toast.show('onClearText')
                    }}
                    clearIcon={{name: 'clear'}}
                    placeholder='Type Here...'
                    ref={search => this.search = search}/>

                <Toast ref={toast => this.toast = toast}/>
            </View>
        )
    }
}