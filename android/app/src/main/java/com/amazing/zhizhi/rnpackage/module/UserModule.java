package com.amazing.zhizhi.rnpackage.module;

import android.widget.Toast;

import java.util.HashMap;
import java.util.Map;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Project ZhiZhi
 * Date 2018-4-2
 *
 * 用户操作模块
 *
 * @author zzzz
 */
public class UserModule extends ReactContextBaseJavaModule {

    // React程序上下文
    private ReactApplicationContext reactContext;

    public UserModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "userModule";
    }

    /**
     * 登录操作
    **/
    @ReactMethod
    public void login(String username, String password) {
        // Toast.makeText(reactContext, username, Toast.LENGTH_SHORT).show();
        userJson(username);
    }

    /**
     * 返回用户信息的json信息
    **/
    public void userJson(String json) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("userJson", json);
    }

    /*@Override
    public Map<String, Object> getConstants() {
        Map<String,Object> params = new HashMap<>();
        params.put("Constant","我是常量，传递给RN");

        return params;
    }*/
}