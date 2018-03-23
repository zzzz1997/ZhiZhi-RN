import React from 'react';
import { ScrollView,View, InteractionManager, StyleSheet } from 'react-native'

import { NavigationPage, ListRow, Button, Label, Toast } from 'teaset';
import IconE from 'react-native-vector-icons/EvilIcons';

import getCoordinates from "../utils/Gps";
import CityListView from "./city/CityListView";

import DATA_JSON from '../../data/cities';

const LAST_CITES = DATA_JSON.lastCities;
const HOT_CITIES = DATA_JSON.hotCities;
const ALL_CITIES = DATA_JSON.allCities;

const URL = 'http://restapi.amap.com/v3/geocode/regeo?key=60be2ee5d03cd873218700f792ef7403&location=';

export default class LocationScreen extends NavigationPage {
    constructor(props) {
        super(props);

        this.state = {
            location: null,
            error: null,
            isLoad: false
        };
    }

    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '选择城市',
        showBackButton: true
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.getLocation();
            this.setState({isLoad: true})
        });
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
                fontWeight: 'bold',
                color: global.theme.primaryColor}}
            bottomSeparator={'none'}
            style={styles.title}/>
    }

    static addButtons(cites){
        const buttons = [];
        for (let cityJson of cites){
            buttons.push(
                <Button
                    title={cityJson.name}
                    key={'default'}
                    style={styles.button}
                    onPress={() => {
                        Toast.message(cityJson.name)
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
            <View style={{flex: 1}}>
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

                <View style={{flex: 1}}>
                    {this.state.isLoad
                        ? <CityListView
                            lastCities={LAST_CITES}
                            hotCities={HOT_CITIES}
                            allCities={ALL_CITIES}/>
                        : <Label>Loading...</Label>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    space: {
        height: 10
    },
    title: {
        backgroundColor: '#d5d5d5'
    },
    button: {
        margin: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});