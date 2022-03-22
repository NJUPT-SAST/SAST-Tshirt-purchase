import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import resultImg from '../../imgs/result.png'
import express from '../../imgs/onrail.png'
import error from '../../imgs/error.png'
import './index.sass'

function Imgs(cases) {
  switch (cases) {
    case 'order': return resultImg;
    case 'express': return express;
    case 'error': return error;
    case 'update': return error;
    default: return resultImg;
  }
}

//给用户展示的提示信息
function notice(cases) {
  switch (cases) {
    case 'order': return '支付成功\n登记已提交!';
    case 'express': return '你的 T-Shirt 已经在路上啦';
    case 'error': return '出现了一些错误\n请联系开发者!';
    case 'update': return '订单信息更新成功!';
    default: return '支付成功\n登记已提交!';
  }
}

function Result(props) {
  useEffect(() => {
    setCases(HandleUrl(props.tid))
  }, [props.tid]);
  //对传过来的url进行解析，获取需要的数据
  function HandleUrl(url) {
    return url.split('&')[0].slice(27)
  }
  console.log(props.tid)

  const [cases, setCases] = useState('express');
  return (
    <View className='wrapper'>
      <Image
        src={Imgs(cases)}
        className='logo'
      ></Image>
      <Text className='title'>{notice(cases)}</Text>
      <Button type='default' className='back' onClick={() => {
        Taro.showLoading({ title: '加载中', mask: true })
        Taro.redirectTo({ url: '/pages/form/index' })
        Taro.hideLoading();
      }}
      >{cases === 'error' ? '返回重新提交订单' : '返回修改信息'}</Button>
      <Text className='info copyright'>©2022 SAST</Text>
    </View>
  );
}

export default Result;
