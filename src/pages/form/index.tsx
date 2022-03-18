import { View, Text,Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import './index.sass'

function Form() {
  return (
    <View className='wrapper'>
      <Text>Form</Text>
      <Button onClick={() => {
        Taro.navigateTo({ url: "/pages/result/index" })
      }} className='btn-submit' type='default'
      >提交并支付</Button>
    </View>

  );
}

export default Form;
