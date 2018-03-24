import React from 'react';
import { View,
    InteractionManager,
    StyleSheet
} from 'react-native'

import { NavigationPage,
    ListRow,
    Button,
    Label,
    Toast
} from 'teaset';
import IconE from 'react-native-vector-icons/EvilIcons';

import getCoordinates from "../utils/Gps";
import CityListView from "./city/CityListView";

import DATA_JSON from '../../data/cities';

// 获取最近城市数据
const LAST_CITES = DATA_JSON.lastCities;
// 获取热门城市数据
const HOT_CITIES = DATA_JSON.hotCities;
// 获取所有城市数据
const ALL_CITIES = DATA_JSON.allCities;

// 高德地图逆地理编码api
const URL = 'http://restapi.amap.com/v3/geocode/regeo?key=60be2ee5d03cd873218700f792ef7403&location=';

/**
 * 选择城市页面
 */
export default class LocationScreen extends NavigationPage {
    constructor(props) {
        super(props);

        this.state = {
            // 定位信息
            location: null,
            // 定位错误信息
            error: null,
            // 动画加载完成标志
            isLoad: false
        };
    }

    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '选择城市',
        showBackButton: true
    };

    componentDidMount() {
        // 等到动画加载完成，处理初始化操作
        InteractionManager.runAfterInteractions(()=>{
            this.setState({isLoad: true});
            this.getLocation()
        });
    }

    /**
     * 定位获取当前城市信息
     */
    getLocation() {
        this.setState({error: '定位中。。。'});
        getCoordinates()
            .then(location => {
                // url加定位经纬度
                fetch(URL + location.coords.longitude +
                    ',' + location.coords.latitude)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        // 解析json信息，直辖市city数据为空，加载province数据
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
                // 截取错误信息
                this.setState({error: error.message})
            })
    }

    renderPage() {
        return(
            <View style={{flex: 1}}>
                <View style={styles.space}/>

                <ListRow
                    title={'当前'}
                    titleStyle={{ fontSize: 12,
                        fontWeight: 'bold',
                        color: global.theme.primaryColor}}
                    bottomSeparator={'none'}
                    style={styles.title}/>

                <View style={styles.buttonsContainer}>
                    <Button
                        onPress={() => {
                            // 点击按钮再次定位
                            this.getLocation()
                        }}
                        style={styles.button}>
                        <IconE name={'location'} color={global.theme.tvBarBtnIconTintColor} size={18}/>

                        <Label style={{color: global.theme.primaryColor}}>{this.state.error ? this.state.error : this.state.location}</Label>
                    </Button>
                </View>

                <View style={styles.listView}>
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
    },
    listView: {
        flex: 1,
        alignItems: 'center'
    }
});