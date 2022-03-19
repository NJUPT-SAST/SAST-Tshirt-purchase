// 云函数 makeOrder
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  var nonce_str = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const res = await cloud.cloudPay.unifiedOrder({
    functionName: payCallback,  // 支付回调的函数名
    envId: "cloud1-8g1hkg947e4303c1",
    subMchId: "1623194528",
    nonceStr: nonce_str,
    body: "NJUPT SAST T-Shirt",
    outTradeNo: nonce_str,
    totalFee: enevt.price,
    spbillCreateIp: "127.0.0.1",
    tradeType: "JSAPI"
  });
  return res;
};