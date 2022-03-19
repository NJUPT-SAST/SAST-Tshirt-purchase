import {
  View,
  Text,
  Button,
  Picker,
  Input,
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import './index.scss'

function Form() {
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  var nonce_str = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const [data, setData] = useState({
    selectorChecked: 'M'
  })
  return (
    <View className='wrapper col'>

      <View className='input-body row'>
        <Text>学号</Text>
        <Input className='input' type='text' placeholder='请输入你的学号' focus />
      </View>

      <View className='input-body row'>
        <Text>姓名</Text>
        <Input className='input' type='text' placeholder='请输入你的姓名' focus />
      </View>

      <View className='input-body'>
        <Text>请选择尺码(下面有尺码信息):</Text>
        <View>
          <Picker
            mode='selector'
            range={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
            onChange={(e) => { console.log(e) }}
          >
            <View className='picker'>
              当前尺码：{data.selectorChecked}
            </View>
          </Picker>
        </View>
      </View>

      <Button onClick={() => {
        Taro.request({
          url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
          data: {
            "appid": "wx3d1f1303e46d91a5",
            "mch_id": "1623194528",
            "device_info": "WECHAT",
            "nonce_str": nonce_str,

          }
        })
        Taro.requestPayment({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
          success(res) { },
          fail(res) { }
        })
        Taro.navigateTo({ url: "/pages/result/index" })
      }} className='btn-submit' type='default'
      >提交并支付</Button>

    </View>
  )
}

export default Form
