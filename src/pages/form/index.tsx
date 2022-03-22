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
  Taro.cloud.init({
    env: 'cloud1-8g1hkg947e4303c1'
  })
  const db = Taro.cloud.database()
  const shirtCollection = db.collection('shirt')

  const [data, setData] = useState({
    openid: '',
    studentId: '',
    name: '',
    phone: '',
    size: 'M',
    count: 1,
    mailAddress: '',
  })

  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(false)

  let openid: string = '';
  let shirt_price = 1;
  let mail_fee = 1;

  const textHeight = useRef();

  // useEffect(() => {
  //   let height: any = textHeight.current;
  //   console.log(textHeight);
  //   console.log(height.clientHeight);
  // }, []);

  useEffect(() => {
    Taro.showLoading({ title: '加载中', mask: true })
    Taro.cloud.callFunction({
      name: 'login',
      // 传递给云函数的event参数
      data: {

      }
    }).then(res => {
      const getOpenid = new Promise(resolve => {
        let result: any = res.result;
        openid = result.openid;
        console.log(res);
        console.log(result, openid);
        setData((prev) => {
          return ({
            ...prev,
            openid: openid,
          })
        })
        resolve(openid);
      })
      getOpenid.then((saveOpenid: string) => {
        shirtCollection.where({
          _openid: saveOpenid,
        })
          .get()
          .then((orderData: any) => {
            console.log(orderData);
            if (orderData.data.length === 0) { Taro.hideLoading(); }
            else if (orderData.data.length === 1) {
              console.log(orderData.data[0])
              setPurchased(true)
              setRequireMail(orderData.data[0].requireMail);
              setPurchased(orderData.data[0].paid)
              setData((prev) => {
                return ({
                  ...prev,
                  studentId: orderData.data[0].studentId,
                  name: orderData.data[0].name,
                  phone: orderData.data[0].phone,
                  size: orderData.data[0].size,
                  count: orderData.data[0].count,
                  mailAddress: orderData.data[0].mailAddress
                })
              });
              Taro.hideLoading();
            }
            else if (orderData.data.length > 1) {
              console.log("Oops! Something went wrong, there is not only one purchase history!");
              Taro.redirectTo({ url: '/pages/result/index?express=error' });
              Taro.hideLoading();
            }
            else {
              console.log("Oops! Unknown error!");
              Taro.redirectTo({ url: '/pages/result/index?express=error' });
              Taro.hideLoading();
            }
          })
          .catch((err) => {
            console.log("error", err);
          })
      })
    }).catch(err => {
      console.log(err)
      // handle error
    })
  }, []);

  function AmountSelect() {
    if (purchased) {
      return (
        <View className='selector-body'>
          <Picker
            mode='selector'
            value={0}
            range={[1, 2, 3, 4, 5]}
            onChange={(e) => { setData(prev => { return { ...prev, count: [1, 2, 3, 4, 5][e.detail.value] } }) }}
            disabled={purchased}
          >
            <View className='picker common-selector'>
              <Text className='text-disable'>数量</Text>
              <View className='picker-label text-disable'>{data.count}</View>
              <Image className='arrow' src={arrow} />
            </View>
          </Picker>
        </View>
      )
    }
    else {
      return (
        <View className='selector-body'>
          <Picker
            mode='selector'
            value={0}
            range={[1, 2, 3, 4, 5]}
            onChange={(e) => { setData(prev => { return { ...prev, count: [1, 2, 3, 4, 5][e.detail.value] } }) }}
            disabled={purchased}
          >
            <View className='picker common-selector'>
              <Text className='text'>数量</Text>
              <View className='picker-label'>{data.count}</View>
              <Image className='arrow' src={arrow} />
            </View>
          </Picker>
        </View>
      )
    }
  }

  function Price() {
    if (!purchased) {
      return (
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
      )
    }
    else return null
  }

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

  return (
    <View className='container'>

      <Text className='pageTitle'>{(purchased) ? '信息修改' : '信息登记'}</Text>
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
        <Text className='uncommon-text'>电话</Text>
        <Input
          className='input textarea'
          placeholder='请输入你的电话号码'
          confirm-type='done'
          value={data.phone}
          type='number'
          onBlur={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, phone: value.detail.value }) });
          }}
          onConfirm={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, phone: value.detail.value }) });
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

      {/* <View className='selector-body'>
        <Picker
          mode='selector'
          value={0}
          range={[1, 2, 3, 4, 5]}
          onChange={(e) => { setData(prev => { return { ...prev, count: [1, 2, 3, 4, 5][e.detail.value] } }) }}
          disabled={purchased}
        >
          <View className='picker common-selector'>
            <Text className='text'>数量</Text>
            <View className='picker-label'>{data.count}</View>
            <Image className='arrow' src={arrow} />
          </View>
        </Picker>
      </View> */}
      <AmountSelect />

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
              <Radio className='radio-list-radio' value='yep' color='#ff5678' checked={requireMail} disabled={purchased}>是</Radio>
            </Label>
            <Label className='radio-list-label'>
              <Radio className='radio-list-radio' value='nope' color='#ff5678' checked={!requireMail} disabled={purchased}>否</Radio>
            </Label>
          </RadioGroup>
        </View>
      </View>

      <AddressInput />

      <Price />

      {/* 提交按钮 */}
      <View className='wrapper'>
        <Button
          onClick={() => {
            if (data.studentId == '' || data.name == '' || data.phone == '' || data.count == 0 || (requireMail && data.mailAddress == '')) {
              Taro.showToast({
                title: '请完整填写表单！',
                icon: 'error',
                duration: 2000
              })
            }
            else {
              Taro.showModal({
                title: '请确认您的信息',
                content: `姓名：${data.name}\n学号：${data.studentId}\n尺码：${data.size}\n数量：${data.count}\n手机号：${data.phone}\n是否需要邮寄：${requireMail ? `是\n收件地址： ${data.mailAddress}\n` : '否'}`,
                success: function (res) {
                  if (res.confirm) {
                    Taro.showLoading({ title: '加载中', mask: true })
                    if (purchased) {
                      db.collection("shirt").where({
                        _openid: data.openid,
                      }).get().then((e) => {
                        console.log(e)
                        let id: any = e.data[0]._id;
                        db.collection('shirt').doc(id).update({
                          data: {
                            studentId: data.studentId,
                            name: data.name,
                            size: data.size,
                            phone: data.phone,
                            mailAddress: data.mailAddress,
                          },
                          success: function () {
                            Taro.redirectTo({ url: `/pages/result/index?express=update` })
                            Taro.hideLoading();
                          },
                        })
                      })
                    }
                    else {
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
                              phone: data.phone,
                              count: data.count,
                              requireMail: requireMail,
                              mailAddress: data.mailAddress,
                              orderInfo: payment,
                              paid: false,
                              realPayPrice: data.count * shirt_price + ((requireMail) ? mail_fee : 0),
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
                              Taro.redirectTo({ url: `/pages/result/index?express=${requireMail ? 'express' : 'order'}` })
                              Taro.hideLoading();
                              /* 成功回调 */
                            },
                            fail(e) {
                              console.log(e)
                              Taro.redirectTo({ url: `/pages/result/index?express=error` })
                              Taro.hideLoading();
                              /* 失败回调 */
                            }
                          });
                        }
                      });
                    }
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
            console.log(data);
          }}
          className='btn-submit'
          type='default'
        >
          {(purchased) ? '保存订单修改' : '提交并支付'}
        </Button>
      </View>
    </View>
  )
}

export default Form

