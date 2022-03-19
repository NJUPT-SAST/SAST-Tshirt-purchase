// 云函数 payCallback
exports.main = async (event, context) => {
    const {
      return_code, // 状态码
      appid, // 小程序 AppID
      mch_id, // 微信支付的商户号
      device_info, // 微信支付分配的终端设备号
      openid, // 用户在商户appid下的唯一标识
      trade_type, // 交易类型：JSAPI、NATIVE、APP
      bank_type // 银行类型
      // ......
      // 更多参数请参考：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7&index=8
    } = event;
  
    /*
      开发者自己的逻辑
    */
  
    // 向微信后台返回成功，否则微信后台将会重复调用此函数
    return { errcode: 0 };
};