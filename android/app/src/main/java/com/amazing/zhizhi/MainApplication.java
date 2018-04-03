package com.amazing.zhizhi;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Arrays;
import java.util.List;

import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecomponent.barcode.RCTCapturePackage;

import cn.bmob.newim.BmobIM;

import com.amazing.zhizhi.rnpackage.MyPackage;
import com.amazing.zhizhi.handler.MyMessageHandler;

/**
 * Project ZhiZhi
 * Date 2018-4-1
 *
 * 程序Application实例
 *
 * @author zzzz
 */
public class MainApplication extends Application implements ReactApplication {

    // 初始化模块包
    private static final MyPackage myPackage = new MyPackage();

    // 初始化React
    private ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    //private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new VectorIconsPackage(),
          new RCTCapturePackage(),
          myPackage
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

   public void setReactNativeHost(ReactNativeHost reactNativeHost) {
      mReactNativeHost = reactNativeHost;
   }


  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  public static MyPackage getReactPackage() {
        return myPackage;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    // 如果应用在当前进程
    if (getApplicationInfo().packageName.equals(getMyProcessName())){
        // 初始化BmobIM
        BmobIM.init(this);
        // 注册消息接收器
        BmobIM.registerDefaultMessageHandler(new MyMessageHandler());
    }
  }

  /**
   * 获取当前进程名
   * @return 当前进程名
  **/
  public static String getMyProcessName() {
          try {
              File file = new File("/proc/" + android.os.Process.myPid() + "/" + "cmdline");
              BufferedReader mBufferedReader = new BufferedReader(new FileReader(file));
              String processName = mBufferedReader.readLine().trim();
              mBufferedReader.close();
              return processName;
          } catch (Exception e) {
              e.printStackTrace();
              return null;
          }
      }
}
