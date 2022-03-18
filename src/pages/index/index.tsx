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
      <Button onClick={() => {
        Taro.navigateTo({ url: "/pages/form/index" })
      }} className='btn-welcome' type='default'
      >马上登记</Button>
    </View>
  );
};

export default Index;
