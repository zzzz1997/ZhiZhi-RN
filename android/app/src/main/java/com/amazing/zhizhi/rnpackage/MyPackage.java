package com.amazing.zhizhi.rnpackage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import com.amazing.zhizhi.rnpackage.module.UserModule;

/**
 * Project ZhiZhi
 * Date 2018-4-2
 *
 * 用户React模块管理包
 *
 * @author zzzz
 */
public class MyPackage implements ReactPackage {

    // 用户操作模块
    public UserModule userModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        userModule = new UserModule(reactContext);
        modules.add(userModule);

        // 添加模块
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}