import React, { Component } from 'react';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

let storage;

export default class MyStorage extends Component {
    static _getInstance() {
        if(storage === undefined) {
            storage = new Storage({
                storageBackend: AsyncStorage
            });
        }

        return storage
    }

    static _save(key, data, expires) {
        storage.save({
            key: key,
            data: data,
            expires: expires
        })
    }

    static _load(key, params, someFlag, callBack) {
        storage.load({
            key: key,
            syncParams: {
                params: params,
                someFlag: someFlag,
            }
        }).then(ret => {
            callBack(ret);
            return ret;
        }).catch(() => {
            callBack(false)
        })
    }

    static _remove(key) {
        storage.remove({
            key: key
        })
    }

    static _removeAll() {
        storage.clearMap()
    }

    static _clearDataByKey(key) {
        storage.clearMapForKey(key)
    }
}