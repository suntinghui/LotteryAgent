var app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getCookie = () => {
  if (!app.globalData.cookie) {
    app.globalData.cookie = wx.getStorageSync(app.globalData.kCookie);
  }

  return app.globalData.cookie;
}

const getPK_Buyer = () => {
  if (!app.globalData.pk_buyer) {
    app.globalData.pk_buyer = wx.getStorageSync(app.globalData.kBuyer);
  }

  return app.globalData.pk_buyer;
}

const isNullOrEmpty = str => {
  return (null == str || str.length == 0)
}

const array2Str = arr => {
  console.log(arr)
  var temp = "";
  for (var i=0;i<arr.length; i++) {
    temp += arr[i];

    if (i != arr.length-1)
      temp += ",";
  }
  console.log(temp)
}

module.exports = {
  formatTime: formatTime,
  getCookie: getCookie,
  getPK_Buyer: getPK_Buyer,
  isNullOrEmpty:isNullOrEmpty,
  array2Str: array2Str
}