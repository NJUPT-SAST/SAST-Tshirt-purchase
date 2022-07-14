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
} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import arrow from '../../imgs/right-arrow.svg';
import sizes from '../../imgs/size.png';

function Form() {
  Taro.cloud.init({
    env: 'cloud1-8g1hkg947e4303c1',
  });

  const db = Taro.cloud.database();

  const [data, setData] = useState({
    openid: '',
    studentId: '',
    name: '',
    phone: '',
    size: 'M',
    count: 1,
    mailAddress: '',
  });

  const [goodsData, setGoodsData] = useState({
    limit: '',
    name: '',
    price: 0,
    mailfee: 0,
  });

  /* purchased 为是否已经下单 */
  /* 全支付流程为先下单，后支付。下单时 paid 为 false,支付后覆盖写表为 true */
  const [purchased, setPurchased] = useState(false);
  const [paid, setPaid] = useState(false);


  const textHeight = useRef();

  useEffect(() => {
    Taro.showLoading({ title: '加载中', mask: true });
    Taro.cloud.callFunction({
      name: 'login',
      // 传递给云函数的event参数
      data: {

      },
    }).then((res) => {
      db.collection('goods').doc('6d85a2b962c10ea00e4940ea6d173ffe').get().then((gData: any) => {
        console.log(gData);
        setGoodsData({
          limit: gData.data.limit,
          name: gData.data.name,
          price: gData.data.price,
          mailfee: gData.data.mailfee,
        });
      });
      return res;
    }).then(res => {
      const getOpenid = new Promise(resolve => {
        let { result } = res;
        console.log(res);
        console.log(result, result.openid);
        setData((prev) => {
          return ({
            ...prev,
            openid: result.openid,
          });
        });
        resolve(result.openid);
      });
      getOpenid.then((saveOpenid: string) => {
        db.collection('shirt').where({
          _openid: saveOpenid,
        })
          .get()
          .then((orderData: any) => {
            console.log(orderData);
            if (orderData.data.length === 0) { Taro.hideLoading(); } else if (orderData.data.length === 1) {
              console.log(orderData.data[0]);
              setPurchased(true);
              setPaid(orderData.data[0].paid);
              setRequireMail(orderData.data[0].requireMail);
              setData((prev) => {
                return ({
                  ...prev,
                  studentId: orderData.data[0].studentId,
                  name: orderData.data[0].name,
                  phone: orderData.data[0].phone,
                  size: orderData.data[0].size,
                  count: orderData.data[0].count,
                  mailAddress: orderData.data[0].mailAddress,
                });
              });
              Taro.hideLoading();
            } else if (orderData.data.length > 1) {
              console.log('Oops! Something went wrong, there is not only one purchase history!');
              Taro.redirectTo({ url: '/pages/result/index?express=error' });
              Taro.hideLoading();
            } else {
              console.log('Oops! Unknown error!');
              Taro.redirectTo({ url: '/pages/result/index?express=error' });
              Taro.hideLoading();
            }
          })
          .catch((err) => {
            console.log('error', err);
          });
      });
    }).catch(err => {
      console.log(err);
      // handle error
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let shirt_price = goodsData.price;
  let mail_fee = goodsData.mailfee;

  function AmountSelect() {
    if (purchased) {
      return (
        <View className="selector-body">
          <Picker
            mode="selector"
            value={0}
            range={[1, 2, 3, 4, 5]}
            onChange={(e) => { setData(prev => { return { ...prev, count: [1, 2, 3, 4, 5][e.detail.value] }; }); }}
            disabled={purchased}
          >
            <View className="picker common-selector">
              <Text className="text-disable">数量</Text>
              <View className="picker-label text-disable">{data.count}</View>
              <Image className="arrow" src={arrow} />
            </View>
          </Picker>
        </View>
      );
    } else {
      return (
        <View className="selector-body">
          <Picker
            mode="selector"
            value={0}
            range={[1, 2, 3, 4, 5]}
            onChange={(e) => { setData(prev => { return { ...prev, count: [1, 2, 3, 4, 5][e.detail.value] }; }); }}
            disabled={purchased}
          >
            <View className="picker common-selector">
              <Text className="text">数量</Text>
              <View className="picker-label">{data.count}</View>
              <Image className="arrow" src={arrow} />
            </View>
          </Picker>
        </View>
      );
    }
  }

  function Price() {
    if (!purchased) {
      return (
        <View className="total-price">
          <View className="price-text-row price-detail-margin price-detail-title">
            <Text>支付明细</Text>
          </View>
          <View id="price-text-right-align price-detail-margin">
            <View className="price-text-row">
              <Text>商品总额</Text>
              <Text className="price">￥{data.count * shirt_price / 100}</Text>
            </View>
            <View className="price-text-row price-detail-margin">
              <Text>运费</Text>
              {/* <Text className='price'>￥{(requireMail) ? mail_fee / 100 : 0}</Text> */}
              <Text className="price">免邮费</Text>
            </View>
          </View>
          <View className="total-price-row price-detail-margin">
            <Text style={{ fontSize: 'medium' }}>合计</Text>
            <Text id="total-price-text">￥{(data.count * shirt_price + ((requireMail) ? mail_fee : 0)) / 100}</Text>
          </View>
        </View>
      );
    } else return null;
  }

  function AddressInput() {
    if (requireMail) {
      return (
        <View className="input-body">
          <Text className="uncommon-text">地址</Text>
          <Input
            className="input textarea"
            placeholder="请输入地址"
            value={data.mailAddress}
            onBlur={(value) => {
              console.log(value);
              setData((prev) => { return ({ ...prev, mailAddress: value.detail.value.toString() }); });
            }}
            onConfirm={(value) => {
              console.log(value);
              setData((prev) => { return ({ ...prev, mailAddress: value.detail.value.toString() }); });
            }}
          />
        </View>
      );
    } else return null;
  }

  const [requireMail, setRequireMail] = useState(true);

  function CustomText() {
    if (purchased && paid) return <View>保存订单修改</View>;
    else if (!purchased && !paid) return <View>提交并支付</View>;
    else return <View>继续支付</View>;
  }

  return (
    <View className="container">
      <Image src="https://guangzhou-store.mxte.cc/sast-t-shirt/tshirt.png" style={{ marginBottom: '20rpx', width: '100%' }} mode="aspectFit" showMenuByLongpress />
      <Text className="pageTitle">{(purchased) ? '信息修改' : '信息登记'}</Text>
      <Text className="pageInfo">请填写个人信息并支付费用预订SAST T-Shirt</Text>


      <View className="input-body" ref={textHeight}>
        <Text className="uncommon-text">学号</Text>
        <Input
          className="input textarea"
          placeholder="请输入你的学号"
          confirm-type="done"
          value={data.studentId}
          onBlur={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, studentId: value.detail.value.toString() }); });
          }}
          onConfirm={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, studentId: value.detail.value.toString() }); });
          }}
        />
      </View>

      <View className="input-body">
        <Text className="uncommon-text">姓名</Text>
        <Input
          className="input textarea"
          placeholder="请输入你的姓名"
          confirm-type="done"
          value={data.name}
          onBlur={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, name: value.detail.value.toString() }); });
          }}
          onConfirm={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, name: value.detail.value.toString() }); });
          }}
        />
      </View>

      <View className="input-body">
        <Text className="uncommon-text">电话</Text>
        <Input
          className="input textarea"
          placeholder="请输入你的电话号码"
          confirm-type="done"
          value={data.phone}
          type="number"
          onBlur={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, phone: value.detail.value }); });
          }}
          onConfirm={(value) => {
            console.log(value);
            setData((prev) => { return ({ ...prev, phone: value.detail.value }); });
          }}
        />
      </View>

      <View className="selector-body">
        <Picker
          mode="selector"
          value={3}
          range={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
          onChange={(e) => { setData(prev => { return { ...prev, size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'][e.detail.value] }; }); }}
        >
          <View className="picker common-selector">
            <Text className="text">尺码</Text>
            <View className="picker-label">{data.size}</View>
            <Image className="arrow" src={arrow} />
          </View>
        </Picker>
      </View>
      <Image src={sizes} mode="aspectFit" style={{ height: '180px' }} show-menu-by-longpress />

      <AmountSelect />

      {/* <View className='selector-body'>
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
      </View> */}

      <AddressInput />

      <Price />

      {/* 提交按钮 */}
      <View className="wrapper">
        <Button
          onClick={() => {
            console.log(data);
            if (data.studentId == '' || data.name == '' || data.phone == '' || data.count == 0 || (requireMail && data.mailAddress == '')) {
              Taro.showToast({
                title: '请完整填写表单！',
                icon: 'error',
                duration: 2000,
              });
            } else {
              Taro.showModal({
                title: '请确认您的信息',
                content: `姓名：${data.name}\n学号：${data.studentId}\n尺码：${data.size}\n数量：${data.count}\n手机号：${data.phone}\n是否需要邮寄：${requireMail ? `是\n收件地址： ${data.mailAddress}\n` : '否'}`,
                success: function (res) {
                  if (res.confirm) {
                    Taro.showLoading({ title: '加载中', mask: true });
                    if (purchased && paid) {
                      db.collection('shirt').where({
                        _openid: data.openid,
                      }).get().then((e) => {
                        console.log(e);
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
                            Taro.redirectTo({ url: '/pages/result/index?express=update' });
                            Taro.hideLoading();
                          },
                        });
                      });
                    } else if (!purchased && !paid) {
                      Taro.cloud.callFunction({
                        name: 'makeOrder',
                        data: {
                          price: data.count * shirt_price + ((requireMail) ? mail_fee : 0),
                          /* 开发者自定义参数 */
                        },
                        success: async (respond) => {
                          // 取得云函数返回的订单信息
                          console.log(respond);
                          let { result } = respond;
                          const { payment } = result;
                          let { _id } = await db.collection('shirt').add({
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
                            },
                          });
                          console.log(_id);
                          // 调起微信客户端支付
                          Taro.requestPayment({
                            ...payment,
                            success(e) {
                              console.log(e);
                              Taro.showToast({
                                title: '支付成功！',
                                icon: 'success',
                                duration: 2000,
                              });
                              db.collection('shirt').doc(_id).update(
                                {
                                  data: {
                                    paid: true,
                                  },
                                },
                              ).then(() => {
                                Taro.redirectTo({ url: `/pages/result/index?express=${requireMail ? 'express' : 'order'}` });
                                Taro.hideLoading();
                                /* 成功回调 */
                              });
                            },
                            fail(e) {
                              /* 失败回调 */
                              console.log(e);
                              if (e.errMsg === 'requestPayment:fail cancel') {
                                Taro.hideLoading();
                                Taro.showToast({
                                  title: '支付取消',
                                  icon: 'error',
                                  duration: 2000,
                                });
                                Taro.redirectTo({ url: '/pages/form/index' });
                              } else {
                                Taro.redirectTo({ url: '/pages/result/index?express=error' });
                                Taro.hideLoading();
                              }
                            },
                          });
                        },
                      });
                    } else if (purchased && !paid) {
                      db.collection('shirt').where({
                        _openid: data.openid,
                      }).get().then((response) => {
                        console.log(response.data[0]);
                        let id: any = response.data[0]._id;
                        let payment = response.data[0].orderInfo;
                        Taro.requestPayment({
                          ...payment,
                          success(e) {
                            console.log(e);
                            Taro.showToast({
                              title: '支付成功！',
                              icon: 'success',
                              duration: 2000,
                            });
                            db.collection('shirt').doc(id).update(
                              {
                                data: {
                                  paid: true,
                                },
                              },
                            ).then(() => {
                              Taro.redirectTo({ url: `/pages/result/index?express=${requireMail ? 'express' : 'order'}` });
                              Taro.hideLoading();
                              /* 成功回调 */
                            });
                          },
                          fail(e) {
                            /* 失败回调 */
                            console.log(e);
                            if (e.errMsg === 'requestPayment:fail cancel') {
                              Taro.hideLoading();
                              Taro.showToast({
                                title: '支付取消',
                                icon: 'error',
                                duration: 2000,
                              });
                            } else {
                              Taro.redirectTo({ url: '/pages/result/index?express=error' });
                              Taro.hideLoading();
                            }
                          },
                        });
                      });
                    }
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                },
              });
            }
          }}
          className="btn-submit"
          type="default"
        >
          <CustomText />
        </Button>
      </View>
    </View>
  );
}

export default Form;