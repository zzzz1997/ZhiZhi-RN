import { PermissionsAndroid, Platform } from 'react-native'

const requestPermission = () => {
    if(Platform.OS === 'ios') return Promise.resolve(true)
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Duhen të drejtat për kordinatat GPS',
            'message': 'Kto të dhëna duhen për të gjeneruar adresën tuaj'
        }
    ).then(granted => {
        if(granted === PermissionsAndroid.RESULTS.GRANTED) {
            return Promise.resolve("You can use the location")
        } else {
            return Promise.reject("Location permission denied")
        }
    })
};

const getCoordinates = () => {
    return requestPermission().then(ok => {
        return new Promise((resolve, reject) => {
            const options = Platform.OS === 'android'
                ? {enableHighAccuracy:true,timeout:5000}
                : {enableHighAccuracy:true,timeout:5000,maximumAge:2000};
            global.navigator.geolocation.getCurrentPosition(resolve, reject, options)
        })
    })
};

export default getCoordinates