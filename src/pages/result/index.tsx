import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import resultImg from '../../imgs/result.png'
import './index.sass'

function Result() {
  return (
    <View className='wrapper'>
      <Image
        src={resultImg}
        className='logo'
      ></Image>
      <Text className='title'>支付成功，登记已提交</Text>
      <Button type='default' className='back' onClick={()=>{
        Taro.navigateTo({url:'/pages/form/index'})
      }}
      >返回修改信息</Button>
    </View>
  );
}

export default Result;
