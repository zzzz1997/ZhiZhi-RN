package com.amazing.zhizhi.handler;

import cn.bmob.newim.listener.BmobIMMessageHandler;
import cn.bmob.newim.event.MessageEvent;
import cn.bmob.newim.event.OfflineMessageEvent;

/**
 * Project ZhiZhi
 * Date 2018-4-2
 *
 * BmobIM消息接收器
 *
 * @author zzzz
 */
public class MyMessageHandler extends BmobIMMessageHandler{

    @Override
    public void onMessageReceive(final MessageEvent event) {
        //在线消息
    }

    @Override
    public void onOfflineReceive(final OfflineMessageEvent event) {
        //离线消息，每次connect的时候会查询离线消息，如果有，此方法会被调用
    }
}