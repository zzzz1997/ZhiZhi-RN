import { PermissionsAndroid,
    Platform
} from 'react-native'

/**
 * Android权限获取
 *
 * @returns {*} 回调方法
 */
const requestPermission = () => {
    if(Platform.OS === 'ios') {
        return Promise.resolve(true)
    }

    // 请求Android权限
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': '授予定位权限',
            'message': '请授予\'职知\'定位权限，以便为您提供更贴身的服务'
        }
    ).then(granted => {
        // 分离处理结果
        if(granted === PermissionsAndroid.RESULTS.GRANTED) {
            return Promise.resolve("定位权限获取成功")
        } else {
            return Promise.reject("定位权限获取失败")
        }
    })
};

/**
 * 封装方法实现
 *
 * @returns {Promise<*>|*|PromiseLike<T>|Promise<T>} Promise对象
 */
const getCoordinates = () => {
    return requestPermission().then(ok => {
        return new Promise((resolve, reject) => {
            // 根据手机设置定位参数
            const options = Platform.OS === 'android'
                ? {enableHighAccuracy:true,timeout:5000}
                : {enableHighAccuracy:true,timeout:5000,maximumAge:2000};
            global.navigator.geolocation.getCurrentPosition(resolve, reject, options)
        })
    })
};

// GPS的封装
export default getCoordinates