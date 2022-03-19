import React from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import welcomeImg from "../../imgs/welcome.png"
import './index.scss'

const Index = () => {
  return (
    <View className='wrapper'>
      <Image className='logo' src={welcomeImg} />
      <Text className='title'>SAST T-Shirt 购买登记</Text>
      <View id='bottom'>
        <Button onClick={() => {
          Taro.showModal({
            title: '服务协议',
            content: '请你务必认真阅读、充分理解“隐私政策”各条款，并在同意后点击“同意”按钮，才能进行下一步操作。',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                Taro.navigateTo({ url: "/pages/form/index" })
              } else if (res.cancel) {
                console.log('用户点击取消')
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
