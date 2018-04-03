package com.amazing.zhizhi.entity;

import cn.bmob.v3.BmobUser;

/**
 * Project ZhiZhi
 * Date 2018-4-2
 *
 * 普通用户实体类
 *
 * @author zzzz
 */
public class User extends BmobUser {

    // 用户地址
    private String address;
    // 用户年龄
    private int age;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}