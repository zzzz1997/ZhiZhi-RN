package com.amazing.zhizhi;

import android.os.Bundle;
import android.widget.Toast;

import com.facebook.react.ReactActivity;

import cn.bmob.newim.BmobIM;
import cn.bmob.newim.core.ConnectionStatus;
import cn.bmob.newim.listener.ConnectListener;
import cn.bmob.newim.listener.ConnectStatusChangeListener;
import cn.bmob.v3.Bmob;
import cn.bmob.v3.BmobUser;
import cn.bmob.v3.exception.BmobException;

import com.amazing.zhizhi.entity.User;

/**
 * Project ZhiZhi
 * Date 2018-4-1
 *
 * 应用主活动
 *
 * @author zzzz
 */
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ZhiZhi";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        initBmob();
    }

    /**
     * 初始化操作
    **/
    private void initBmob() {
            // 初始化Bmob数据服务
            Bmob.initialize(this, "0631cabe524c94d77e374aedcc387af7");

            // 获取当前用户
            User user = BmobUser.getCurrentUser(User.class);
            if (user != null) {
                // 连接通讯服务器
                BmobIM.connect(user.getObjectId(), new ConnectListener() {
                    @Override
                    public void done(String uid, BmobException e) {
                        if (e == null) {
                            //连接成功
                        } else {
                              //连接失败
                            Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    }
                });
                // 监听BmobIM连接状态
                BmobIM.getInstance().setOnConnectStatusChangeListener(new ConnectStatusChangeListener() {
                    @Override
                    public void onChange(ConnectionStatus status) {
                        Toast.makeText(getApplicationContext(), status.getMsg(), Toast.LENGTH_SHORT).show();
                    }
               });
            }
        }

        @Override
        protected void onDestroy() {
            super.onDestroy();
            // 清理导致内存泄露的资源
            BmobIM.getInstance().clear();
        }
}
