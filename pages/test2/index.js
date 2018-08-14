Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        open: false,
        data: [{
            flag: true,
            content: "三个数字均相同的号码称为豹子，如（111，222，333）",
            date: "1天21小时前"
          },
          {
            flag: false,
            content: "三个数字均相同的号码称为豹子三个数字均相同的号码称为豹子三个数字均相同的号码称为豹子三个数字均相同的号码",
            date: "1天21小时前"
          }, {
            flag: true,
            content: "三个数字均相同的号码称为豹子，如（111，222，333）",
            date: "1天21小时前"
          },
          {
            flag: false,
            content: "三个数字均相同的号码称为豹子三个数",
            date: "1天21小时前"
          }, {
            flag: true,
            content: "三个数字均相同的号码称为豹子，如（111，222，333）",
            date: "1天21小时前"
          },
          {
            flag: false,
            content: "三个数字均相同的号码称为豹子三个数字均相同的号码称为豹子三个数字均相同",
            date: "1天21小时前"
          },
        ]
      },
      {
        open: false,
        data: [{
            flag: true,
            content: "hahahahahaahahahahahaha",
            date: "1天21小时前"
          },
          {
            flag: false,
            content: "因为需要传递的数据比较多，所以我们通过dataset携带参数信息",
            date: "1天21小时前"
          }, {
            flag: true,
            content: "事件是视图层到逻辑层的通讯方式。 事件可以将用户的行为反馈到逻辑层进行处理。",
            date: "1天21小时前"
          }
        ]
      }
    ]

  },

  showAction: function(event) {
    var which = event.target.dataset.which
    this.data.list[which].open = true;
    this.setData(this.data)
  },

  closeAction: function(event) {
    var which = event.target.dataset.which
    this.data.list[which].open = false;
    this.setData(this.data)
  }


})