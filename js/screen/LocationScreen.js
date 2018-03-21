import React from 'react';
import { ScrollView,View, StyleSheet } from 'react-native'

import { NavigationPage, ListRow, Button, Label, Toast } from 'teaset';
import IconE from 'react-native-vector-icons/EvilIcons';

import getCoordinates from "../utils/Gps";

/*const GeoHighAccuracy = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (locHighAccuracy) => {
                resolve(locHighAccuracy)
            },
            (error) => {
                GeoLowAccuracy()
                    .then((locLowAccuracy) => {
                        resolve(locLowAccuracy)
                    })
                    .catch((err) => {
                        reject(err)
                    });
            },
            {enableHighAccuracy: true, timeout: 25000, maximumAge: 0}
        )
    })
};

const GeoLowAccuracy = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (locLowAccuracy) => {
                resolve(locLowAccuracy)
            },
            (error) => {
                reject(error)
            },
            {enableHighAccuracy: false, timeout: 5000, maximumAge: 3600000}
        )
    })
};*/

const URL = 'http://restapi.amap.com/v3/geocode/regeo?key=60be2ee5d03cd873218700f792ef7403&location=';
const HOT_CITIES = Array('北京', '上海', '广州', '深圳', '成都', '杭州', '南京', '天津', '武汉', '重庆');

export default class LocationScreen extends NavigationPage {
    constructor(props) {
        super(props);

        this.state = {
            location: null,
            error: null,
        };
    }

    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '选择城市',
        showBackButton: true,
    };

    componentDidMount() {
        this.getLocation()
    }

    getLocation() {
        this.setState({error: '定位中。。。'});
        getCoordinates()
            .then(location => {
                fetch(URL + location.coords.longitude +
                    ',' + location.coords.latitude)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({location: responseJson.regeocode.addressComponent.city
                                ? responseJson.regeocode.addressComponent.city
                                : responseJson.regeocode.addressComponent.province,
                            error: null});
                        Toast.message('定位成功')
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            })
            .catch(error => {
                this.setState({error: error.message})
            })
    }

    addTitle(title){
        return <ListRow
            title={title}
            titleStyle={{ fontSize: 12,
                color: global.theme.primaryColor}}
            bottomSeparator={'none'}
            style={styles.title}/>
    }

    static addButtons(cites){
        const buttons = [];
        for (let title of cites){
            buttons.push(
                <Button
                    title={title}
                    key={'default'}
                    style={styles.button}
                    onPress={() => {
                        Toast.message(title)
                    }}/>
            )
        }
        return <View style={styles.buttonsContainer}>
            {buttons.map((elem) => {
                return elem
            })}
        </View>
    }

    renderPage() {
        return(
            <ScrollView>
                <View style={styles.space}/>

                {this.addTitle('当前')}

                <View style={styles.buttonsContainer}>
                    <Button
                        onPress={() => {
                            this.getLocation()
                        }}
                        style={styles.button}>
                        <IconE name={'location'} color={global.theme.tvBarBtnIconTintColor} size={18}/>

                        <Label style={{color: global.theme.primaryColor}}>{this.state.error ? this.state.error : this.state.location}</Label>
                    </Button>
                </View>

                {this.addTitle('最近')}

                {this.addTitle('热门')}
                {LocationScreen.addButtons(HOT_CITIES)}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    space: {
        height: 10
    },
    title: {
        backgroundColor: '#d5d5d5',
    },
    button: {
        margin: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});