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
    studentId: '',
    name: '',
    size: 'M',
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
              <Text className='text'>尺码</Text>
              <View className='picker-label'>{data.size}</View><Image className='arrow' src={arrow} />
            </View>
          </Picker>
        </View>
      </View>

      <View className='wrapper'>
        <Button
          onClick={() => {
            // Taro.navigateTo({ url: '/pages/result/index' })
            Taro.cloud.init({
              env: 'cloud1-8g1hkg947e4303c1'
            })
            Taro.cloud.callFunction({
              name: "makeOrder",
              data: {
                price: 100,
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
                    /* 成功回调 */
                  },
                  fail(e) {
                    console.log(e)
                    /* 失败回调 */
                  }
                });
              }
            });
            // Taro.cloud.callFunction({
            //   // 要调用的云函数名称
            //   name: 'login',
            // }).then(cloud_function_res => {
            //   console.log(cloud_function_res)
            //   let output: any = cloud_function_res;
            //   let openId: string = output.result.userInfo.openId;
            //   console.log(output.result.userInfo.openId)
            //   Taro.request({
            //     url: "https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi",
            //     header: {},
            //     data: {
            //       "appid": "wx3d1f1303e46d91a5",
            //       "mchid": "1623194528",
            //       "description": "NJUPT SAST T-Shirt",
            //       "out_trade_no": nonce_str,
            //       "notify_url": "https://api.mch.weixin.qq.com/v3/pay/transactions/notify",
            //       "amount": {
            //         "total": 1,
            //         "currency": "CNY"
            //       },
            //       "payer": {
            //         "openid": openId
            //       }
            //     },
            //     success: (res) => {
            //       console.log(res)
            //       // Taro.requestPayment({
            //       //   timeStamp: '',
            //       //   nonceStr: '',
            //       //   package: '',
            //       //   signType: 'MD5',
            //       //   paySign: '',
            //       //   success(pay_res) { },
            //       //   fail(pay_res) { }
            //       // })
            //     },
            //     method: 'POST',
            //   })
            // }).catch(err => {
            //   console.log(err)
            //   // handle error
            // })
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
