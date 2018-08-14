var headImg = null;
var that = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg:"/img/head-placehold.png"

  },

  changeHeadImg: function() {
    that = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        that.setData({
          headImg: res.tempFilePaths[0]
        })
      }
    })
  }

})