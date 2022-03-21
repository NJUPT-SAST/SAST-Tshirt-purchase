import {
  View,
  Text,
  Button,
  Picker,
  Image,
  Label,
  Radio,
  RadioGroup,
  Textarea,
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import arrow from '../../imgs/right-arrow.svg'

function Form() {
  let shirt_price = 1;
  let mail_fee = 1;
  Taro.cloud.init({
    env: 'cloud1-8g1hkg947e4303c1'
  })

  const textHeight = useRef();

  useEffect(() => {
    let height: any = textHeight.current;
    console.log(textHeight);
    console.log(height.clientHeight);
  }, []);


  useEffect(() => {
    Taro.cloud.callFunction({
      name: 'login',
      // 传递给云函数的event参数
      data: {

      }
    }).then(res => {
      console.log(res)
      // output: res.result === 3
    }).catch(err => {
      console.log(err)
      // handle error
    })
  }, []);

  function AddressInput() {
    if (data.requireMail) {
      return (
        <View className='input-body'>
          <Text className='uncommon-text'>地址</Text>
          <Textarea className='input textarea' placeholder='请输入地址' focus />
        </View>
      )
    }
    else return null
  }

  const [wxData, setWxData] = useState({
    userInfo: {},
    hasUserInfo: false
  })

  const [data, setData] = useState({
    studentId: '',
    name: '',
    size: 'M',
    count: 1,
    requireMail: false,
    mailAddress: '',
  })

  const db = Taro.cloud.database()
  const shirtCollection = db.collection('shirt')

  return (
    <View className='container'>

      <Text className='pageTitle'>信息登记</Text>
      <Text className='pageInfo'>请填写个人信息并支付费用预订SAST T-Shirt</Text>


      <View className='input-body' ref={textHeight}>
        <Text className='uncommon-text'>学号</Text>
        <Textarea className='input textarea' placeholder='请输入你的学号' focus />
      </View>

      <View className='input-body'>
        <Text className='uncommon-text'>姓名</Text>
        <Textarea className='input textarea' placeholder='请输入你的姓名' />
      </View>

      <View className='input-body'>
        <Picker
          mode='selector'
          value={3}
          range={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
          onChange={(e) => { setData(prev => { return { ...prev, size: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'][e.detail.value] } }) }}
        >
          <View className='picker common-selector'>
            <Text className='text'>尺码</Text>
            <View className='picker-label'>{data.size}</View>
            <Image className='arrow' src={arrow} />
          </View>
        </Picker>
      </View>

      <View className='input-body'>
        <Picker
          mode='selector'
          value={0}
          range={[1, 2, 3, 4, 5]}
          onChange={(e) => { setData(prev => { return { ...prev, count: [1, 2, 3, 4, 5][e.detail.value] } }) }}
        >
          <View className='picker common-selector'>
            <Text className='text'>数量</Text>
            <View className='picker-label'>{data.count}</View>
            <Image className='arrow' src={arrow} />
          </View>
        </Picker>
      </View>

      <View className='input-body'>
        <View className='common-selector'>
          <Text className='text'>是否需要邮寄</Text>
          <RadioGroup onChange={(e) => { e.detail.value === 'yep' ? setData((prev) => { return { ...prev, requireMail: true } }) : setData((prev) => { return { ...prev, requireMail: false } }) }}>
            <Label className='radio-list-label'>
              <Radio className='radio-list-radio' value='yep' color='#ff5678' checked={data.requireMail}>是</Radio>
            </Label>
            <Label className='radio-list-label'>
              <Radio className='radio-list-radio' value='nope' color='#ff5678' checked={!data.requireMail}>否</Radio>
            </Label>
          </RadioGroup>
        </View>
      </View>

      <AddressInput />

      <View className='total-price'>
        <View className='price-text-row price-detail-margin price-detail-title'>
          <Text>支付明细</Text>
        </View>
        <View id='price-text-right-align price-detail-margin'>
          <View className='price-text-row'>
            <Text>商品总额</Text>
            <Text className='price'>￥{data.count * shirt_price / 100}</Text>
          </View>
          <View className='price-text-row price-detail-margin'>
            <Text>运费</Text>
            <Text className='price'>￥{(data.requireMail) ? mail_fee / 100 : 0}</Text>
          </View>
        </View>
        <View className='total-price-row price-detail-margin'>
          <Text id='total-price-text'>￥{data.count * shirt_price / 100 + ((data.requireMail) ? mail_fee / 100 : 0)}</Text>
        </View>
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
                    // shirtCollection.
                    // shirtCollection.add({
                    //   data: {
                    //     description: "learn cloud database",
                    //     due: new Date("2018-09-01"),
                    //     requireMail: data.requireMail,
                    //     mailAddress: data.mailAddress === '' ? null : data.mailAddress,
                    //     done: false
                    //   }
                    // })
                    Taro.navigateTo({ url: `/pages/result/index?express=${data.requireMail ? 'express' : 'order'}` })
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
