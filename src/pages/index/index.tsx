import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import welcomeImg from "../../imgs/welcome.png"
import './index.scss'

const Index = () => {
  const [data, setData] = useState({ auth: false });
  return (
    <View className='wrapper'>
      <Image className='logo' src={welcomeImg} />
      <Text className='title'>SAST T-Shirt 购买登记</Text>
      <View id='bottom'>
        <Button onClick={() => {
          Taro.showModal({
            title: '服务协议',
            content: '请你务必认真阅读、充分理解“隐私政策”各条款，并在同意后点击“确认”按钮，才能进行下一步操作。',
            success(e) {
              if (e.confirm) {
                console.log('用户点击确定')
                Taro.getSetting({
                  withSubscriptions: true,
                  success: res => {
                    console.log(res)
                    if (!res.authSetting["scope.userInfo"]) {
                      while (!data.auth) {
                        Taro.authorize({
                          scope: 'scope.userInfo',
                          success: (auth_res) => {
                            console.log(auth_res);
                            setData((prev) => { return { ...prev, auth: true } });
                            Taro.navigateTo({ url: '/pages/form/index' })
                          }
                        })
                      }
                    } else {
                      setData((prev) => { return { ...prev, auth: true } });
                      Taro.login({
                        success: function (login_res) {
                          console.log(login_res);
                          Taro.navigateTo({ url: '/pages/form/index' })
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }} className='btn-welcome' type='default'
        >马上登记</Button>
        
        <Text className='info underline' onClick={() => {
          Taro.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success(res) {
              console.log(res.tapIndex)
            },
            fail(res) {
              console.log(res.errMsg)
            }
          })
        }}
        >隐私策略</Text>
        <Text className='info copyright'>©2022 SAST</Text>
      </View>
    </View>
  );
};

export default Index;
