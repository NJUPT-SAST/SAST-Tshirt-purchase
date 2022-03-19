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
} from '@tarojs/components'
import { stringify } from '@tarojs/runtime'
import Taro from '@tarojs/taro'
import React, { Component, useState } from 'react'
import './index.scss'

class PagePicker extends React.Component {
  state = {
    selector: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    selectorChecked: 'M'
  }

  onChange = (e) => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
    })
  }

  onTimeChange = (e) => {
    this.setState({
      timeSel: e.detail.value,
    })
  }
  onDateChange = (e) => {
    this.setState({
      dateSel: e.detail.value,
    })
  }

  render() {
    return (
      <View className='page-section'>
        <Text>请选择尺码(下面有尺码信息):</Text>
        <View>
          <Picker
            mode='selector'
            range={this.state.selector}
            onChange={this.onChange}
          >
            <View className='picker'>
              当前尺码：{this.state.selectorChecked}
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

        <View className='input-body'>
          <Text>学号</Text>
          <Input type='text' placeholder='请输入你的学号' focus />
        </View>

        <View className='input-body'>
          <Text>姓名</Text>
          <Input type='text' placeholder='请输入你的姓名' focus />
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
