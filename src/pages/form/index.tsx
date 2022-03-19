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
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import './index.scss'
import arrow from '../../imgs/right-arrow.svg'



function Form() {
  function AddressInput(props) {
    if (data.requireMail) {
      return (
        <View className='input-body'>
          <Text>地址</Text>
          <Input className='input' type='text' placeholder='请输入地址' focus />
        </View>
      )
    }
    else return null
  }

  const [data, setData] = useState({
    studentId: '',
    name: '',
    size: 'M',
    requireMail: false,
    mailAddress: '',
  })

  Taro.cloud.init({
    env: 'cloud1-8g1hkg947e4303c1'
  })

  const db = Taro.cloud.database()
  const shirtCollection = db.collection('shirt')

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
        <Picker
          mode='selector'
          value={3}
          range={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
          onChange={(e) => { setData(prev => { return { ...prev, size: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'][e.detail.value] } }) }}
        >
          <View className='picker'>
            <Text className='text'>尺码</Text>
            <View className='picker-label'>{data.size}</View><Image className='arrow' src={arrow} />
          </View>
        </Picker>
      </View>

      <View>
        <RadioGroup className='input-body' onChange={(e) => { e.detail.value === 'yep' ? setData((prev) => { return { ...prev, requireMail: true } }) : setData((prev) => { return { ...prev, requireMail: false } }) }}>
          <Text className='text'>是否需要邮寄</Text>
          <Label className='radio-list-label'>
            <Radio className='radio-list-radio' value='yep' color='#ff5678' checked={data.requireMail}>是</Radio>
          </Label>
          <Label className='radio-list-label'>
            <Radio className='radio-list-radio' value='nope' color='#ff5678' checked={!data.requireMail}>否</Radio>
          </Label>
        </RadioGroup>
        <AddressInput />
      </View>

      <View className='wrapper'>
        <Button
          onClick={() => {
            Taro.cloud.callFunction({
              name: "makeOrder",
              data: {
                price: 1,
                /* 开发者自定义参数 */
              },
              success: (res) => {
                // 取得云函数返回的订单信息
                console.log(res)
                let order: any = res.result;
                const payment = order.payment;
                // 调起微信客户端支付
                Taro.requestPayment({
                  ...payment,
                  success(e) {
                    console.log(e)
                    Taro.showToast({
                      title: '支付成功！',
                      icon: 'success',
                      duration: 2000
                    })
                    // shirtCollection.add({
                    //   data: {
                    //     description: "learn cloud database",
                    //     due: new Date("2018-09-01"),
                    //     requireMail: data.requireMail,
                    //     mailAddress: data.mailAddress === '' ? null : data.mailAddress,
                    //     done: false
                    //   }
                    // })
                    Taro.navigateTo({ url: `/pages/result/index?express=${data.requireMail?'express':'order'}` })
                    /* 成功回调 */
                  },
                  fail(e) {
                    console.log(e)
                    /* 失败回调 */
                  }
                });
              }
            });
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
