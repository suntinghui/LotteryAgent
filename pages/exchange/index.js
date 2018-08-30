const loading = require('../../utils/loading.js')
const util = require('../../utils/util.js')
var wxbarcode = require('../../utils/codeutil.js');

const app = getApp()

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

var LTLS_StateArr = new Array()

var that = null;

Page({
  data: {
    tabs: ["待办", "已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    tabClick: function(e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    },

    todoList: [],
    doneList: [],
    fullscreen: false
  },

  onLoad: function() {
    that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }

    });

    this.queryList();
  },

  onShow:function(e) {
    requestLTLS()
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  queryList: () => {
    loading.show("请稍候")
    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + util.getPK_Buyer() + '/coupons/',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: (res) => {
        loading.hide();

        console.log("查询兑换券：" + JSON.stringify(res.data))

        if (res.statusCode == "200" || res.statusCode == "201") {
          that.processData(res.data)

        } else {
          wx.showModal({
            title: '提示',
            content: '出现错误：' + res.errMsg,
            showCancel: false
          })
        }

      },
      fail: (e) => {
        wx.showModal({
          title: '提示',
          content: '出现错误：' + e.data,
          showCancel: false
        })

        loading.hide();
      }
    })

  },


  processData: function(data) {
    var todoArray = new Array()
    var doneArray = new Array()

    for (var i = 0; i < data.length; i++) {
      data[i].StateDesc = this.getStateDesc(data[i].LTLS_State);

      // // 状态LTLS_State 0和1表示待办,其他表示已完成
      if (data[i].LTLS_State == 0 || data[i].LTLS_State == 1) {
        todoArray.push(data[i])
      } else {
        doneArray.push(data[i])
      }
    }

    this.setData({
      todoList: todoArray,
      doneList: doneArray
    })
  },

  // 从数据字典中查询状态描述信息
  getStateDesc: function(key) {
    if (LTLS_StateArr.length == 0)
      requestLTLS()

    for (var i = 0; i < LTLS_StateArr.length; i++) {
      if (LTLS_StateArr[i].DICT_Value == key) {
        return LTLS_StateArr[i].DICT_Name
      }
    }

    return "未知"
  },

  requestLTLS: function (e) {
    wx.request({
      url: app.globalData.HOST + '/api/v1/dictionaries/?field=LTLS_State',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));
        LTLS_StateArr = res.data;
      },
      fail: function (e) {
        console.log("request dictionaries fail......");

        wx.showModal({
          title: '提示',
          content: '基础数据获取失败，请重试',
          showCancel: false
        })

      }
    })
  },

  showInfo: function(e) {
    var uid = e.target.dataset.uid;

    var showItem = {}
    for (var i = 0; i < this.data.todoList.length; i++) {
      if (this.data.todoList[i].LTLS_Uid == uid) {
        showItem = this.data.todoList[i]
        break
      }
    }

    wxbarcode.barcode('barcode', showItem.LTLS_Code, 500, 200);

    this.setData({
      showItem:showItem,
      dialogvisible: true
    })
  }

});