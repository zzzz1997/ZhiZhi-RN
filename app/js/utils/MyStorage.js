import React, { Component } from 'react';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

// 存储对象，需要先初始化后使用
let storage;

/**
 * 存储类简单封装
 */
export default class MyStorage extends Component {
    /**
     * 初始化存储对象
     *
     * @returns {*} 存储对象
     * @private false
     */
    static _getInstance() {
        if(storage === undefined) {
            storage = new Storage({
                storageBackend: AsyncStorage
            });
        }

        return storage
    }

    /**
     * 存储
     *
     * @param key 关键字
     * @param data 存储数据
     * @private false
     */
    static _save(key, data) {
        storage.save({
            key: key,
            data: data,
            expires: null
        })
    }

    /**
     * 加载
     *
     * @param key 关键字
     * @param callBack 回调方法
     * @private false
     */
    static _load(key, callBack) {
        storage.load({
            key: key,
            syncParams: {
                params: null,
                someFlag: null,
            }
        }).then(ret => {
            callBack(ret);
            return ret;
        }).catch(() => {
            callBack(false)
        })
    }

    /**
     * 移除存储
     *
     * @param key 关键字
     * @private false
     */
    static _remove(key) {
        storage.remove({
            key: key
        })
    }

    /**
     * 移除所有存储
     * @private false
     */
    static _removeAll() {
        storage.clearMap()
    }
}