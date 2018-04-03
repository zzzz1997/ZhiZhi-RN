import React, { Component } from 'react';
import { View,
    ListView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

import { Toast } from 'teaset'

// 分组头部高度
const SECTION_HEIGHT = 30;
// 组内单元高度
const ROW_HEIGHT = 40;
// 按钮行高度
const BOX_HEIGHT = 50;

// 默认一行最多均匀显示按钮个数
const BOX_COUNT = 5;

// 总高度数组
let totalHeight = [];

// 获取屏幕宽度
const {width} = Dimensions.get('window');

// 最近列表数据的关键字
const LAST_KEY = '最近';
// 热门列表数据的关键字
const HOT_KEY = '热门';

/**
 * 城市列表组件
 */
export default class CityListView extends Component {
    constructor(props) {
        super(props);

        // 获取传递的城市列表信息
        let LAST_CITIES = this.props.lastCities;
        let HOT_CITIES = this.props.hotCities;
        let ALL_CITIES = this.props.allCities;

        // 绑定数据
        let dataBlob = {};
        dataBlob[LAST_KEY] = LAST_CITIES;
        dataBlob[HOT_KEY] = HOT_CITIES;

        // 分组并绑定数据
        ALL_CITIES.map(cityJson => {
            let key = cityJson.letters.charAt(0).toUpperCase();

            if(dataBlob[key]) {
                // 存入已存在的组
                let subList = dataBlob[key];
                subList.push(cityJson)
            } else {
                // 创建新组
                let subList = [];
                subList.push(cityJson);
                dataBlob[key] = subList;
            }
        });

        // 分组头关键字组
        let sectionIDs = Object.keys(dataBlob);
        let rowIDs = sectionIDs.map(sectionID => {
            // 统计每组的数据集
            let thisRow = [];
            let count = dataBlob[sectionID].length;
            for(let i = 0; i < count; i++) {
                thisRow.push(i)
            }

            //计算该组的总高度
            let eachHeight = SECTION_HEIGHT + ROW_HEIGHT * thisRow.length;
            if (sectionID === LAST_KEY || sectionID === HOT_KEY) {
                let rowNum = (thisRow.length % BOX_COUNT === 0)
                    ? (thisRow.length / BOX_COUNT)
                    : parseInt(thisRow.length / BOX_COUNT) + 1;

                eachHeight = SECTION_HEIGHT + BOX_HEIGHT * rowNum;
            }

            // 统计入数组
            totalHeight.push(eachHeight);

            return thisRow;
        });

        /**
         * 处理获得组头关键字
         *
         * @param dataBlob 分组数据集
         * @param sectionID 组头关键字
         * @returns {*} 组头关键字
         */
        const getSectionData = (dataBlob, sectionID) => {
            return sectionID;
        };

        /**
         *  查询获取行数据
         * @param dataBlob 分组数据集
         * @param sectionID 组头关键字
         * @param rowID 行id
         * @returns {*} 行数据
         */
        const getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID][rowID];
        };

        // 创建数据资源
        let ds = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            // 数据资源
            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            // 导航栏关键字集
            letters: sectionIDs
        };
    }

    /**
     * 处理点击事件
     *
     * @param cityJson 点击行的城市数据
     */
    static cityNameClick(cityJson) {
        Toast.message(cityJson.name)
    }

    /**
     *  滑动到导航栏指定的关键字行
     *
     * @param index 关键字位置
     * @param letter 导航栏关键字
     */
    scrollToLetter(index, letter) {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalHeight[i]
        }
        this._listView.scrollTo({y: position});
        Toast.info(letter)
    }

    /**
     * 渲染导航栏
     *
     * @param letter 导航栏关键字
     * @param index 关键字位置
     * @returns {*} 导航栏单位视图
     */
    renderRightLetters(letter, index) {
        return (
            <TouchableOpacity
                key={'right_letter' + index}
                onPress={() => {
                    this.scrollToLetter(index, letter)
                }}>
                <View style={styles.letter}>
                    <Text style={{
                        textAlign: 'center',
                        color: global.theme.primaryColor
                    }}>{letter}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 渲染城市按钮
     *
     * @param cityJson 城市数据
     * @returns {*} 城市按钮视图
     */
    static renderListBox(cityJson) {
        return (
            <TouchableOpacity
                style={styles.rowViewBox}
                onPress={() => {
                    this.cityNameClick(cityJson)
                }}>
                <View style={{
                    borderWidth: 1,
                    borderColor: global.theme.primaryColor,
                    borderRadius: 4,
                    height: 30,
                    width: width / BOX_COUNT - 25,
                    margin: 10,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text style={{
                        color: global.theme.primaryColor
                    }}>{cityJson.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 渲染数据行
     *
     * @param cityJson 城市数据
     * @param rowId 行id
     * @returns {*} 城市行视图
     */
    renderListRow(cityJson, rowId) {
        if (rowId === LAST_KEY || rowId === HOT_KEY) {
            // 如果行id是'最新'或'热门'的话，城市数据渲染成按钮
            return CityListView.renderListBox(cityJson, rowId);
        }

        return (
            <TouchableOpacity
                key={'list_item_' + cityJson.id}
                style={styles.rowView}
                onPress={() => {
                    CityListView.cityNameClick(cityJson)
                }}>
                <View style={styles.rowData}>
                    <Text style={styles.rowDataText}>{cityJson.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * 渲染分组头
     * @param sectionData 组头数据
     * @returns {*} 组头视图
     */
    static renderListSectionHeader(sectionData) {
        return (
            <View style={styles.sectionView}>
                <Text style={{
                    color: global.theme.primaryColor,
                    fontWeight: 'bold'
                }}>
                    {sectionData}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listContainner}>
                    <ListView
                        ref={listView => this._listView = listView}
                        contentContainerStyle={styles.contentContainer}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderListRow}
                        renderSectionHeader={CityListView.renderListSectionHeader}
                        enableEmptySections={true}
                        initialListSize={500}/>
                    <View style={styles.letters}>
                        {this.state.letters.map((letter, index) =>
                            this.renderRightLetters(letter, index)
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#d5d5d5',
    },
    listContainner: {
        marginBottom: 5
    },
    contentContainer: {
        flexDirection: 'row',
        width: width,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    letters: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    letter: {
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionView: {
        paddingTop: 5,
        paddingBottom: 5,
        height: 30,
        paddingLeft: 10,
        width: width,
        backgroundColor: '#D5D5D5'
    },
    rowView: {
        height: ROW_HEIGHT,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 0.5
    },
    rowData: {
        paddingTop: 10,
        paddingBottom: 2
    },

    rowDataText: {
        color: 'gray',
        width: width
    },

    rowViewBox: {
        backgroundColor: '#ffffff'
    }
});