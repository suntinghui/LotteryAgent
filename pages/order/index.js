var wxCharts = require('../../utils/wxcharts-min.js');
const loading = require('../../utils/loading.js')
const util = require('../../utils/util.js')

var app = getApp()

var that = null

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["账单", "统计"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    totalIncome: "0",
    points: "0",

    orderList: [],
    summaryData: {}

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

    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
      series: [{
        name: '成交量1',
        data: [15, 20, 45, 37, 4, 80]
      }, {
        name: '成交量2',
        data: [70, 40, 65, 100, 34, 18]
      }],
      yAxis: {
        format: function(val) {
          return val + '万';
        }
      },
      width: 320,
      height: 200
    });

    this.requestOrderList()

    this.requestSummaryList()
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    if (e.currentTarget.id == '0') {
      this.requestOrderList()
    } else if (e.currentTarget.id == '1') {
      this.requestSummaryList()
    }
  },

  requestOrderList:function() {
    loading.show("请稍候");

    var buyerId = wx.getStorageSync(app.globalData.kBuyer);

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + '/bills/',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: function (res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        loading.hide();

        that.setData({
          orderList: res.data
        })

      },
      fail: function (e) {
        console.log("request login fail......");

        loading.hide();

        wx.showModal({
          title: '提示',
          content: '失败：(' + e.errMsg + ")",
          showCancel: false,
        })

      }
    })

  },

  requestSummaryList: function () {
    loading.show("请稍候");

    var buyerId = wx.getStorageSync(app.globalData.kBuyer);

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + '/summaries/',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: function (res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        loading.hide();

        that.setData({
          orderList: res.data
        })

      },
      fail: function (e) {
        console.log("request login fail......");

        loading.hide();

        wx.showModal({
          title: '提示',
          content: '失败：(' + e.errMsg + ")",
          showCancel: false,
        })

      }
    })

  },

});