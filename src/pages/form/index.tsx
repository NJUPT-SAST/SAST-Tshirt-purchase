import {
  View,
  Text,
  Button,
  Picker,
  Input,
  Image,
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import './index.scss'
import arrow from '../../imgs/right-arrow.svg'

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
    <View className='container'>

      <Text className='pageTitle'>信息登记</Text>
      <Text className='pageInfo'>请填写个人信息并支付费用预订SAST T-Shirt</Text>

      <View className='input-body'>
        <Text>学号</Text>
        <Input className='input' type='text' placeholder='请输入你的学号' focus />
      </View>

      <View className='input-body'>
        <Text>姓名</Text>
        <Input className='input' type='text' placeholder='请输入你的姓名' focus />
      </View>

      <View className='page-section'>
        <View>
          <Picker
            mode='selector'
            range={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
            onChange={(e) => { console.log(e) }}
          >
            <View className='picker'>
              <Text>尺码</Text><View className='picker-label'>{this.state.selectorChecked}</View><Image className='arrow' src={arrow} style='height:60rpx;width:60rpx;' />
            </View>
          </Picker>
        </View>
      </View>

      <View className='wrapper'>
        <Button
          onClick={() => {
            Taro.navigateTo({ url: '/pages/result/index' })
          }}
          className='btn-submit'
          type='default'
        >
          提交并支付
        </Button>
      </View>
    </View>
  )
}

export default Form
