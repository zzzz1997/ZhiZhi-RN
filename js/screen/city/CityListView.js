import React, { Component } from 'react';
import { View, ListView, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

import { Toast } from 'teaset'

const SECTION_HEIGHT = 30;
const ROW_HEIGHT = 40;
const BOX_HEIGHT = 50;
let totalHeight = [];

const {width} = Dimensions.get('window');

const LAST_KEY = '最近';
const HOT_KEY = '热门';

export default class CityListView extends Component {
    constructor(props) {
        super(props);

        let LAST_CITIES = this.props.lastCities;
        let HOT_CITIES = this.props.hotCities;
        let ALL_CITIES = this.props.allCities;

        let dataBlob = {};
        dataBlob[LAST_KEY] = LAST_CITIES;
        dataBlob[HOT_KEY] = HOT_CITIES;

        ALL_CITIES.map(cityJson => {
            let key = cityJson.letters.charAt(0).toUpperCase();

            if(dataBlob[key]) {
                let subList = dataBlob[key];
                subList.push(cityJson)
            } else {
                let subList = [];
                subList.push(cityJson);
                dataBlob[key] = subList;
            }
        });

        let sectionIDs = Object.keys(dataBlob);
        let rowIDs = sectionIDs.map(sectionID => {
            let thisRow = [];
            let count = dataBlob[sectionID].length;
            for(let i = 0; i < count; i++) {
                thisRow.push(i)
            }

            let eachHeight = SECTION_HEIGHT + ROW_HEIGHT * thisRow.length;
            if (sectionID === LAST_KEY || sectionID === HOT_KEY) {
                let rowNum = (thisRow.length % 5 === 0)
                    ? (thisRow.length / 5)
                    : parseInt(thisRow.length / 5) + 1;

                eachHeight = SECTION_HEIGHT + BOX_HEIGHT * rowNum;
            }

            totalHeight.push(eachHeight);

            return thisRow;
        });

        const getSectionData = (dataBlob, sectionID) => {
            return sectionID;
        };
        const getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID][rowID];
        };

        let ds = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            letters: sectionIDs
        };
    }

    static cityNameClick(cityJson) {
        Toast.message(cityJson.name)
    }

    scrollToLetter(index, letter) {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalHeight[i]
        }
        this._listView.scrollTo({y: position});
        Toast.info(letter)
    }

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
                    width: width / 5 - 25,
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

    renderListRow(cityJson, rowId) {
        if (rowId === LAST_KEY || rowId === HOT_KEY) {
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