import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import resultImg from '../../imgs/result.png'
import express from '../../imgs/onrail.png'
import './index.sass'

function Imgs(cases){
  switch (cases){
    case 'order': return resultImg;
    case 'express': return express;
  }
}

function notice(cases){
  switch (cases){
    case 'order': return '支付成功，登记已提交';
    case 'express': return '你的 T-Shirt 已经在路上啦';
  }
}

function Result() {
const [cases, setCases]=useState('express');
  return (
    <View className='wrapper'>
      <Image
        src={Imgs(cases)}
        className='logo'
      ></Image>
      <Text className='title'>{notice(cases)}</Text>
      <Button type='default' className='back' onClick={()=>{
        Taro.navigateTo({url:'/pages/form/index'})
      }}
      >返回修改信息</Button>
      <Text className='info copyright'>©2022 SAST</Text>
    </View>
  );
}

export default Result;
