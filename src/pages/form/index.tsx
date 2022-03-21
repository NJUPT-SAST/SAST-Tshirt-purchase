import {
  View,
  Text,
  Button,
  Picker,
  Image,
  Label,
  Radio,
  RadioGroup,
  Input,
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import arrow from '../../imgs/right-arrow.svg'

function Form() {
  const [data, setData] = useState({
    openid: '',
    studentId: '',
    name: '',
    phone: 114514,
    size: 'M',
    count: 1,
    mailAddress: '',
  })

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
      const getOpenid = new Promise(resolve => {
        let result: any = res.result;
        let openid: string = result.openid;
        console.log(result, openid);
        setData((prev) => {
          return ({
            ...prev,
            openid: openid,
          })
        })
        resolve(openid);
      })
      getOpenid.then((openid: string) => {
        console.log(data.openid)
      })
    }).catch(err => {
      console.log(err)
      // handle error
    })
  }, []);

  function AddressInput() {
    if (requireMail) {
      return (
        <View className='input-body'>
          <Text className='uncommon-text'>地址</Text>
          <Input
            className='input textarea'
            placeholder='请输入地址'
            value={data.mailAddress}
            onBlur={(value) => {
              console.log(value);
              setData((prev) => { return ({ ...prev, mailAddress: value.detail.value.toString() }) });
            }}
            onConfirm={(value) => {
              console.log(value);
              setData((prev) => { return ({ ...prev, mailAddress: value.detail.value.toString() }) });
            }}
          />
        </View>
      )
    }
    else return null
  }

  const [requireMail, setRequireMail] = useState(false);

  const db = Taro.cloud.database()
  const shirtCollection = db.collection('shirt')

  return (
    <View className='container'>

      <Text className='pageTitle'>信息登记</Text>
      <Text className='pageInfo'>请填写个人信息并支付费用预订SAST T-Shirt</Text>


      <View className='input-body' ref={textHeight}>
        <Text className='uncommon-text'>学号</Text>
        <Input
          className='input textarea'
          placeholder='请输入你的学号'
          confirm-type='done'
          value={data.studentId}
          onBlur={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, studentId: value.detail.value.toString() }) });
          }}
          onConfirm={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, studentId: value.detail.value.toString() }) });
          }}
        />
      </View>

      <View className='input-body'>
        <Text className='uncommon-text'>姓名</Text>
        <Input
          className='input textarea'
          placeholder='请输入你的姓名'
          confirm-type='done'
          value={data.name}
          onBlur={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, name: value.detail.value.toString() }) });
          }}
          onConfirm={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, name: value.detail.value.toString() }) });
          }}
        />
      </View>

      <View className='input-body'>
        <Text className='uncommon-text'>手机号</Text>
        <Input
          className='input textarea'
          placeholder='请输入你的手机号'
          confirm-type='done'
          value={data.phone.toString()}
          type='number'
          onBlur={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, phone: Number(value.detail.value) }) });
          }}
          onConfirm={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, phone: Number(value.detail.value) }) });
          }}
        />
      </View>

      <View className='selector-body'>
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

      <View className='selector-body'>
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

      <View className='selector-body'>
        <View className='common-selector'>
          <Text className='text'>是否需要邮寄</Text>
          <RadioGroup
            className='mail-boolen'
            onChange={(e) => {
              e.detail.value === 'yep' ? setRequireMail(true) : setRequireMail(false);
            }}
          >
            <Label className='radio-list-label'>
              <Radio className='radio-list-radio' value='yep' color='#ff5678' checked={requireMail}>是</Radio>
            </Label>
            <Label className='radio-list-label'>
              <Radio className='radio-list-radio' value='nope' color='#ff5678' checked={!requireMail}>否</Radio>
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
            <Text className='price'>￥{(requireMail) ? mail_fee / 100 : 0}</Text>
          </View>
        </View>
        <View className='total-price-row price-detail-margin'>
          <Text id='total-price-text'>￥{(data.count * shirt_price + ((requireMail) ? mail_fee : 0)) / 100}</Text>
        </View>
      </View>

      {/* 提交按钮 */}
      <View className='wrapper'>
        <Button
          onClick={() => {
            if (data.studentId == '' || data.name == '' || data.count == 0 || (requireMail && data.mailAddress == '')) {
              Taro.showToast({
                title: '请完整填写表单！',
                icon: 'error',
                duration: 2000
              })
            }
            else {
              Taro.showModal({
                title: '请确认您的信息',
                content: `姓名：${data.name}\n学号：${data.studentId}\n尺码：${data.size}\n数量：${data.count}\n收电话：${data.phone}是否需要邮寄：${requireMail?`是\n收件人： ${data.mailAddress}\n收件地址： ${data.mailAddress}\n`:'否'}`,
                success: function (res) {
                  if (res.confirm) {
                    Taro.cloud.callFunction({
                      name: "makeOrder",
                      data: {
                        price: data.count * shirt_price + ((requireMail) ? mail_fee : 0),
                        /* 开发者自定义参数 */
                      },
                      success: async (respond) => {
                        // 取得云函数返回的订单信息
                        console.log(respond)
                        let result: any = respond.result;
                        const payment = result.payment;
                        let { _id } = await shirtCollection.add({
                          data: {
                            studentId: data.studentId,
                            name: data.name,
                            size: data.size,
                            count: data.count,
                            requireMail: requireMail,
                            mailAddress: data.mailAddress,
                            orderInfo: payment,
                            paid: false,
                          }
                        })
                        console.log(_id);
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
                            shirtCollection.doc(_id).update(
                              {
                                data: {
                                  'paid': true
                                }
                              }
                            )
                            // shirtCollection.
                            // shirtCollection.add({
                            //   data: {
                            //     description: "learn cloud database",
                            //     due: new Date("2018-09-01"),
                            //     requireMail: requireMail,
                            //     mailAddress: data.mailAddress === '' ? null : data.mailAddress,
                            //     done: false
                            //   }
                            // })
                            Taro.navigateTo({ url: `/pages/result/index?express=${requireMail ? 'express' : 'order'}` })
                            /* 成功回调 */
                          },
                          fail(e) {
                            console.log(e)
                            /* 失败回调 */
                          }
                        });
                      }
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              console.log(data);
            }
          }}
          className='btn-submit'
          type='default'
        >
          提交并支付
        </Button>
      </View>
      <Button onClick={() => { console.log(data.openid); }}>114514</Button>
    </View>
  )
}

export default Form

