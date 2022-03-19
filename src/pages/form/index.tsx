import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import './index.sass'

function Form() {
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
var nonce_str = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  return (
    <View className='wrapper'>
      <Text>Form</Text>
      <Button onClick={() => {
        Taro.request({
          url:"https://api.mch.weixin.qq.com/pay/unifiedorder",
          data:{
            "appid":"wx3d1f1303e46d91a5",
            "mch_id":"1623194528",
            "device_info":"WECHAT",
            "nonce_str":nonce_str,
            
          }
        })
        
        Taro.requestPayment({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
          success (res) { },
          fail (res) { }
        })
        Taro.navigateTo({ url: "/pages/result/index" })
      }} className='btn-submit' type='default'
      >提交并支付</Button>
    </View>

  );
}

export default Form;
