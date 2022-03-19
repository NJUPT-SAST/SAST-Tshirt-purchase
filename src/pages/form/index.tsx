/* eslint-disable react/jsx-no-comment-textnodes */
import {
  View,
  Text,
  Button,
  RadioGroup,
  Radio,
  Label,
  Picker,
  PickerView,
  PickerViewColumn,
  Input,
  Image,
} from '@tarojs/components'
import { stringify } from '@tarojs/runtime'
import Taro from '@tarojs/taro'
import React, { Component, useState } from 'react'
import './index.scss'
import arrow from '../../imgs/right-arrow.svg'

class PagePicker extends React.Component {
  state = {
    selector: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    selectorChecked: 'M',
  }

  onChange = (e) => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
    })
  }

  render() {
    return (
      <View className='page-section'>
        <View>
          <Picker
            mode='selector'
            range={this.state.selector}
            onChange={this.onChange}
          >
            <View className='picker'>
              <Text>尺码</Text>
              <View className='picker-label'>{this.state.selectorChecked}</View>
              <Image
                className='arrow'
                src={arrow}
                style='height:60rpx;width:60rpx;'
              />
            </View>
          </Picker>
        </View>
      </View>
    )
  }
}

function Form() {
  return (
    <>
      <View className='container'>
        <RadioGroup>
          <Label className='radio-list__label' >
            <Radio
              className='radio-list__radio' value='1' checked={false} >
              dfsa
            </Radio>
          </Label>

        </RadioGroup>
      </View>

      <View className='container'>
        <Text className='pageTitle'>信息登记</Text>
        <Text className='pageInfo'>
          请填写个人信息并支付费用预订SAST T-Shirt
        </Text>
        <View className='input-body'>
          <Text>学号</Text>
          <Input
            className='input'
            type='text'
            placeholder='请输入你的学号'
            focus
          />
        </View>

        <View className='input-body'>
          <Text>姓名</Text>
          <Input
            className='input'
            type='text'
            placeholder='请输入你的姓名'
            focus
          />
        </View>

        <View className='input-body'>
          <PagePicker />
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
    </>
  )
}

export default Form
