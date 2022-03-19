/* eslint-disable react/jsx-no-comment-textnodes */
import {
  View,
  Text,
  Button,
  Picker,
  Input,
  Image,
  Label,
  Radio,
  RadioGroup,
  Switch,
  Form as TaroForm
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
    selectorChecked: '请选择尺码',
    expressSelector: false
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
            onChange={(e) => { setData(s => { return { ...s, selectorChecked: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'][e.detail.value] } }) }}
          >
            <View className='picker'>
              <Text className='text'>尺码</Text>
              <View className='picker-label'>{data.selectorChecked}</View><Image className='arrow' src={arrow} />
            </View>
          </Picker>
        </View>

        <RadioGroup className='input-body' onChange={(e) => { /* e.detail.value === 'yep' ? setData({ expressSelector: true }) */ }}>
          <Text className='text'>是否需要快递</Text>
          <Label className='radio-list__label'>
            <Radio className='radio-list__radio' value='yep' color='#ff5678' checked={false}>是</Radio>
          </Label>
          <Label className='radio-list__label'>
            <Radio className='radio-list__radio' value='nope' color='#ff5678' checked>否</Radio>
          </Label>
        </RadioGroup>

        <View className='input-body'>
          <Text>地址</Text>
          <Input className='input' type='text' placeholder='请输入你的收货地址' focus />
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

      <TaroForm onSubmit={e=>console.log(e)} onReset={e=>console.log(e)} >
        <View className='example-body'>
          <Switch name='switch' className='form-switch'></Switch>
        </View>
      </TaroForm>

    </View>
    
  )
}

export default Form
