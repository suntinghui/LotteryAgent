// 获取数据字典
const getDic = (host) => {
  wx.request({
    url: host + '/api/v1/dictionaries/',
    method: "GET",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function(res) {
      console.log(res.statusCode + "--" + JSON.stringify(res.data));

      // 取到数据即更新缓存，以保证数据最新
      prcessData(res.data);
    },
    fail: function(e) {
      console.log("request getDic fail......");

      /*
      wx.showModal({
        title: '提示',
        content: '基础数据获取失败，请重新进入',
        showCancel: false
      })
      */

    },
    complete: function() {
      console.log("request getDic complete......");
    }
  })
}

// 不做处理，直接保存
const prcessData = data => {
  wx.setStorageSync(getApp().globalData.kDataDic, data);
}

const getDicWith = type => {
  var data = wx.getStorageSync(getApp().globalData.kDataDic);

  if (!data) {
    getDic();

    /*
    wx.showModal({
      title: '提示',
      content: '未初始化数据，请重新进入该页面',
      showCancel: false,
    })
    */

  } else {
    var arr = new Array();
    for (var i = 0; i < data.length; i++) {
      if (data[i].DICT_Field == type) {
        arr.push({
          name: data[i].DICT_Value,
          value: data[i].DICT_Name
        });
      }
    }

    return arr;
  }
}

const getWeeks = () => {
  return [{
      name: '1',
      value: '周一'
    },
    {
      name: '2',
      value: '周二',
      checked: 'true'
    },
    {
      name: '3',
      value: '周三'
    },
    {
      name: '4',
      value: '周四'
    },
    {
      name: '5',
      value: '周五'
    },
    {
      name: '6',
      value: '周六'
    },
    {
      name: '0',
      value: '周日'
    },
  ]
}


module.exports = {
  getDic: getDic,
  getDicWith: getDicWith,
  getWeeks: getWeeks
}

/**
 
 200--[{"DICT_Uid":"4a170909fe524950bd36292bdf61d71a","DICT_Field":"AGET_Class","DICT_Name":"店主","DICT_Value":1},{"DICT_Uid":"21de7f8037f84271a23d340a7cab1795","DICT_Field":"AGET_Class","DICT_Name":"常驻彩民","DICT_Value":2},{"DICT_Uid":"8a6ae9ca243d484ba3d58ad9159a1651","DICT_Field":"AGET_Class","DICT_Name":"虚拟身份","DICT_Value":3},{"DICT_Uid":"3f4d51d65d2b41eba823213636f4540a","DICT_Field":"AGET_Level","DICT_Name":"一星","DICT_Value":1},{"DICT_Uid":"7d15577357244f13a5983b4de6d7a78a","DICT_Field":"AGET_Level","DICT_Name":"二星","DICT_Value":2},{"DICT_Uid":"34e4288b637440eebd443ad5f7be0298","DICT_Field":"AGET_Level","DICT_Name":"三星","DICT_Value":3},{"DICT_Uid":"d1fbeea3a2e1428380ab58b83460060e","DICT_Field":"AGET_Level","DICT_Name":"四星","DICT_Value":4},{"DICT_Uid":"772ba053b3ed4057a2c5564b1b085f0a","DICT_Field":"AGET_Level","DICT_Name":"五星","DICT_Value":5},{"DICT_Uid":"0af2e858650f42059578b14835ad2b16","DICT_Field":"AGET_State","DICT_Name":"待审","DICT_Value":0},{"DICT_Uid":"84718222d2e64350afea78fc6575d2ad","DICT_Field":"AGET_State","DICT_Name":"个人资料审核通过","DICT_Value":1},{"DICT_Uid":"ec830f960b7d474fb566184e5b80a6cc","DICT_Field":"AGET_State","DICT_Name":"门店审核通过","DICT_Value":2},{"DICT_Uid":"d92237e11e0a415aae9145121295e47e","DICT_Field":"AGET_State","DICT_Name":"基础资料登记完毕","DICT_Value":3},{"DICT_Uid":"90c0d69d36b246ec8b09c80f14c12f97","DICT_Field":"AGET_State","DICT_Name":"保证金已缴清","DICT_Value":4},{"DICT_Uid":"a788aa5954bb49658faa1064d6c9bd33","DICT_Field":"AGET_State","DICT_Name":"审核完成","DICT_Value":5},{"DICT_Uid":"dfcc931fe6004c198c324c0e593d044d","DICT_Field":"AGET_State","DICT_Name":"暂停业务","DICT_Value":6},{"DICT_Uid":"05082e47f62c4483be9f97347e4fcc95","DICT_Field":"AGET_State","DICT_Name":"终止合作","DICT_Value":7},{"DICT_Uid":"642a6430f1fa459abb53f96d5eacc469","DICT_Field":"AGET_WorkMode","DICT_Name":"上午","DICT_Value":1},{"DICT_Uid":"2c885bb766564730ac5708bd5c963008","DICT_Field":"AGET_WorkMode","DICT_Name":"下午","DICT_Value":2},{"DICT_Uid":"3e67d087c264433bbc9a9f01a35ea7a0","DICT_Field":"AGET_WorkMode","DICT_Name":"全天","DICT_Value":3},{"DICT_Uid":"906b9b636cd14776a5d0cee7cbc23255","DICT_Field":"AGRE_ConfirmMode","DICT_Name":"页面勾选","DICT_Value":1},{"DICT_Uid":"67d3065f14f54732bd6b6fad92c20580","DICT_Field":"AGRE_ConfirmMode","DICT_Name":"短信验证","DICT_Value":2},{"DICT_Uid":"ee7bc0751b884c9b84870a4c06cf5248","DICT_Field":"AGRE_ConfirmMode","DICT_Name":"短信发送密钥","DICT_Value":3},{"DICT_Uid":"52dd03af84dd4d07a585c31eccb5d79d","DICT_Field":"AGRE_State","DICT_Name":"草拟","DICT_Value":0},{"DICT_Uid":"22bef0865b85499db0b76c8f399829a0","DICT_Field":"AGRE_State","DICT_Name":"待审","DICT_Value":1},{"DICT_Uid":"ca279c87f58a4196b10e3a4e8f61a029","DICT_Field":"AGRE_State","DICT_Name":"发布","DICT_Value":5},{"DICT_Uid":"984ab8caffa94c808ed31aacb61e2c03","DICT_Field":"AGRE_State","DICT_Name":"作废","DICT_Value":7},{"DICT_Uid":"f28e1f0b1b974a75a86e3c28b2c3d9aa","DICT_Field":"AGRE_Type","DICT_Name":"必须签署","DICT_Value":1},{"DICT_Uid":"3bcac08d97f84b33aacb0bdd03ac4684","DICT_Field":"AGRE_Type","DICT_Name":"可签可不签","DICT_Value":2},{"DICT_Uid":"128fe01e4e04400faa8d9180344ed7b1","DICT_Field":"ARLS_Mode","DICT_Name":"页面勾选","DICT_Value":1},{"DICT_Uid":"a122cdd2ad06432ea2e35670f048c2a1","DICT_Field":"ARLS_Mode","DICT_Name":"短信验证","DICT_Value":2},{"DICT_Uid":"c16393eaf3624bf29abe82892a3fb143","DICT_Field":"ARLS_Mode","DICT_Name":"线下纸质","DICT_Value":3},{"DICT_Uid":"20a74c6a3ce24f979599912bd34b05fd","DICT_Field":"ARLS_State","DICT_Name":"未确认","DICT_Value":0},{"DICT_Uid":"dd36c3c1ffec478e8382bfb941463578","DICT_Field":"ARLS_State","DICT_Name":"已签订","DICT_Value":5},{"DICT_Uid":"6caa7a0b93bf44a88a3f71a9ae87c805","DICT_Field":"ARLS_State","DICT_Name":"解约","DICT_Value":7},{"DICT_Uid":"0998c8cbcb604d65b98beefd21861919","DICT_Field":"BONS_PayMode","DICT_Name":"平台支付","DICT_Value":1},{"DICT_Uid":"cfc2f99ba6c743fd8ac43e882780c89a","DICT_Field":"BONS_PayMode","DICT_Name":"线下支付","DICT_Value":2},{"DICT_Uid":"92b78ba0ee92435d9b9424a855b4e3d5","DICT_Field":"BONS_State","DICT_Name":"未确认","DICT_Value":0},{"DICT_Uid":"b02095f26a124082b7fd129cf4dc5f90","DICT_Field":"BONS_State","DICT_Name":"已确认","DICT_Value":5},{"DICT_Uid":"4e3048f43f5540758b61899c21771e47","DICT_Field":"CASH_State","DICT_Name":"未确认","DICT_Value":0},{"DICT_Uid":"6034fb4715f5486487e6398d6450858f","DICT_Field":"CASH_State","DICT_Name":"已确认","DICT_Value":1},{"DICT_Uid":"fa9daf703f9640198673bdc13d9d6b37","DICT_Field":"CASH_State","DICT_Name":"挂起","DICT_Value":3},{"DICT_Uid":"2b3471e6d884483995b4f66c0edbb568","DICT_Field":"CASH_State","DICT_Name":"已对账","DICT_Value":5},{"DICT_Uid":"16b63e17e4e540fcb9c3347d0ea4cbb7","DICT_Field":"CASH_State","DICT_Name":"撤销","DICT_Value":7},{"DICT_Uid":"272f61b58820464db7f4fb5aaabe761e","DICT_Field":"CASH_Type","DICT_Name":"入账","DICT_Value":1},{"DICT_Uid":"ba1b258815d84659b252a3b3c2b9479f","DICT_Field":"CASH_Type","DICT_Name":"提现","DICT_Value":2},{"DICT_Uid":"60236e1cb84146428bc4c71c4e0b6f9b","DICT_Field":"CMMT_State","DICT_Name":"未读","DICT_Value":0},{"DICT_Uid":"d3ddb7e92800494088789e188b4e59b8","DICT_Field":"CMMT_State","DICT_Name":"已读","DICT_Value":1},{"DICT_Uid":"d42d9c87019f4d77aba6ec4b6a0f542f","DICT_Field":"CMMT_Type","DICT_Name":"买伴留言板","DICT_Value":1},{"DICT_Uid":"84e06cb0e72448588f64eb9cfe898a20","DICT_Field":"CMMT_Type","DICT_Name":"客服留言","DICT_Value":2},{"DICT_Uid":"0f19a6971bf04a8197c0c599bfd05557","DICT_Field":"COUP_Class","DICT_Name":"单一兑换","DICT_Value":1},{"DICT_Uid":"5f7b7f981050400193f60364eb31ecae","DICT_Field":"COUP_Class","DICT_Name":"一兑多","DICT_Value":2},{"DICT_Uid":"d8146050480b43e7aa8a4b9c5944c27e","DICT_Field":"COUP_DeadlineMode","DICT_Name":"领用计时","DICT_Value":1},{"DICT_Uid":"2eacbeb4a64b4e8e9e90fbbfa779ee53","DICT_Field":"COUP_DeadlineMode","DICT_Name":"固定期限","DICT_Value":2},{"DICT_Uid":"3f66d4d889274955833ff9a873d37b77","DICT_Field":"COUP_State","DICT_Name":"可用","DICT_Value":0},{"DICT_Uid":"b45f98dbc3d04e49a3ecb693bae19ccf","DICT_Field":"COUP_State","DICT_Name":"暂停","DICT_Value":3},{"DICT_Uid":"49648b0c4f054f10a979739dd6e5342a","DICT_Field":"COUP_Type","DICT_Name":"电子券","DICT_Value":1},{"DICT_Uid":"ba0920eef1444d519bd880df520e69ff","DICT_Field":"COUP_Type","DICT_Name":"纸质券","DICT_Value":2},{"DICT_Uid":"33fd685f8679487289e0e2fa03d0306c","DICT_Field":"CPLS_State","DICT_Name":"未使用","DICT_Value":0},{"DICT_Uid":"4fbb773084f04948b3184ab0113a6f00","DICT_Field":"CPLS_State","DICT_Name":"已委托","DICT_Value":1},{"DICT_Uid":"dc9b11fddd5c41bd85cb5b9fefb825b9","DICT_Field":"CPLS_State","DICT_Name":"过期作废","DICT_Value":7},{"DICT_Uid":"956dad075e7b441cbf5e9ac7d8a36ea1","DICT_Field":"FLOG_Class","DICT_Name":"用户签订委托协议","DICT_Value":1},{"DICT_Uid":"25550c3a0a53470fbafa3188699769ae","DICT_Field":"FLOG_Class","DICT_Name":"用户委托兑换券","DICT_Value":2},{"DICT_Uid":"7037aca98a234dd996f2bf9308699256","DICT_Field":"LOTR_Class","DICT_Name":"即开型","DICT_Value":1},{"DICT_Uid":"3093f6a067234a3d8fc1efefd73c5566","DICT_Field":"LTLS_State","DICT_Name":"委托中","DICT_Value":0},{"DICT_Uid":"431ff524f24e48ed95279f32005fa35a","DICT_Field":"LTLS_State","DICT_Name":"接受委托","DICT_Value":1},{"DICT_Uid":"c9fb4a7de3f7405aa73bce7ee7f961f0","DICT_Field":"LTLS_State","DICT_Name":"已兑换","DICT_Value":2},{"DICT_Uid":"c633b602cded42fd940f7985b01d5a3e","DICT_Field":"LTLS_State","DICT_Name":"挂起","DICT_Value":3},{"DICT_Uid":"2c2e2cd37ca54039bd926e73a008b598","DICT_Field":"LTLS_State","DICT_Name":"已开奖","DICT_Value":5},{"DICT_Uid":"655ce756472246a386b34611fc513108","DICT_Field":"MANA_State","DICT_Name":"授权","DICT_Value":0},{"DICT_Uid":"f580676b76eb43e3bedea011b99ed8b6","DICT_Field":"MANA_State","DICT_Name":"暂停","DICT_Value":3},{"DICT_Uid":"29a9d2aa793647a8bef709fded62f389","DICT_Field":"MARK_Class","DICT_Name":"微信公众号推广","DICT_Value":1},{"DICT_Uid":"45d46ebeedfb4c05bc6b9939238bdabf","DICT_Field":"MARK_Class","DICT_Name":"APP客户端推广","DICT_Value":2},{"DICT_Uid":"1d3b3e0fef684ca884fc03059108a12b","DICT_Field":"MARK_Class","DICT_Name":"线下扫码活动","DICT_Value":3},{"DICT_Uid":"a1a922a30d0049a5bea7387c78e59592","DICT_Field":"MARK_Class","DICT_Name":"门店扫码推广","DICT_Value":4},{"DICT_Uid":"1487fb932c884187abc1c5c1ec8f788d","DICT_Field":"MARK_State","DICT_Name":"拟订中","DICT_Value":0},{"DICT_Uid":"e693a8073aa94abcae9d2e91fc18120e","DICT_Field":"MARK_State","DICT_Name":"待发布","DICT_Value":1},{"DICT_Uid":"d0d2b7d4cad04d929157e2b24c48b613","DICT_Field":"MARK_State","DICT_Name":"进行中","DICT_Value":2},{"DICT_Uid":"5a8016fb267e4315aa424eb1701efde5","DICT_Field":"MARK_State","DICT_Name":"暂停","DICT_Value":3},{"DICT_Uid":"dd444a4f85aa4f95b0670d25ae050696","DICT_Field":"MARK_State","DICT_Name":"完成","DICT_Value":5},{"DICT_Uid":"984b5da0164d408f93d82c63a92c3431","DICT_Field":"MARK_State","DICT_Name":"取消","DICT_Value":7},{"DICT_Uid":"37cf86ad65884e368ea943215e70ab02","DICT_Field":"MESG_State","DICT_Name":"未读","DICT_Value":0},{"DICT_Uid":"0ab60e67fa744238bf0a1db0d1ea17ec","DICT_Field":"MESG_State","DICT_Name":"已读","DICT_Value":1},{"DICT_Uid":"b31a086e28bd45968c350caca1264705","DICT_Field":"MESG_State","DICT_Name":"撤销","DICT_Value":7},{"DICT_Uid":"0edec0880624433eb6e4aa24a8ebc4d7","DICT_Field":"MESG_Type","DICT_Name":"私聊","DICT_Value":1},{"DICT_Uid":"11200ca10f9a4b5fb48d093b77087fd4","DICT_Field":"MESG_Type","DICT_Name":"系统消息","DICT_Value":2},{"DICT_Uid":"8b8ef146a817489ca6748a35763316c0","DICT_Field":"PTNR_Class","DICT_Name":"营销合作者","DICT_Value":1},{"DICT_Uid":"6ad465d3b91d4ea89dedfcee4c25e9ca","DICT_Field":"PTNR_Class","DICT_Name":"技术支持","DICT_Value":2},{"DICT_Uid":"27a3fe21816d451c91a71691ef42976b","DICT_Field":"PTNR_Class","DICT_Name":"渠道服务商","DICT_Value":3},{"DICT_Uid":"4ef9072c3c4049f09b6edfe0147c6298","DICT_Field":"rootlist","DICT_Name":"管理员状态","DICT_Value":1},{"DICT_Uid":"20b1124518e04a78984325d81c13ba38","DICT_Field":"rootlist","DICT_Name":"用户类型","DICT_Value":2},{"DICT_Uid":"9ae0d4f8156447cca1396edea6feeb94","DICT_Field":"rootlist","DICT_Name":"合作方类型","DICT_Value":3},{"DICT_Uid":"b31c62e6fb9b404bb773a1898db720d2","DICT_Field":"rootlist","DICT_Name":"市场活动类型","DICT_Value":4},{"DICT_Uid":"e11e9ea9ed89481e958c7ac61cd77143","DICT_Field":"rootlist","DICT_Name":"市场活动状态","DICT_Value":5},{"DICT_Uid":"847ca12ab9044982b52a12ca9811d957","DICT_Field":"rootlist","DICT_Name":"兑换券类型","DICT_Value":6},{"DICT_Uid":"60c7565c63144a3385b99f448c352895","DICT_Field":"rootlist","DICT_Name":"兑换券到期模式","DICT_Value":7},{"DICT_Uid":"e2361ebd7019460f9510e9b082ca41aa","DICT_Field":"rootlist","DICT_Name":"兑换券分类","DICT_Value":8},{"DICT_Uid":"0e2d2e58f7464427b399b594928a560c","DICT_Field":"rootlist","DICT_Name":"兑换券状态","DICT_Value":9},{"DICT_Uid":"46ce9e0ec9ef4bbd9cc0c2e480f04b5f","DICT_Field":"rootlist","DICT_Name":"兑换券使用状态","DICT_Value":10},{"DICT_Uid":"d7ae814930fb44e7aec81edfe3a936dc","DICT_Field":"rootlist","DICT_Name":"彩券类型","DICT_Value":11},{"DICT_Uid":"5c748d9322f14792bc43fc025c193d5f","DICT_Field":"rootlist","DICT_Name":"奖券状态","DICT_Value":12},{"DICT_Uid":"e9ef40337a084647bdfe4a90f5ded5b2","DICT_Field":"rootlist","DICT_Name":"奖金实缴方式","DICT_Value":13},{"DICT_Uid":"1a33d0d7ea024b4eb1eee6100e907dc0","DICT_Field":"rootlist","DICT_Name":"奖金发放状态","DICT_Value":14},{"DICT_Uid":"3e60d364ca1f48d8a5a60653838e5fbe","DICT_Field":"rootlist","DICT_Name":"现金操作类型","DICT_Value":15},{"DICT_Uid":"f30ec589d60045449c6b9e8432a3a0b6","DICT_Field":"rootlist","DICT_Name":"现金操作状态","DICT_Value":16},{"DICT_Uid":"448db5d5be6649129559972973847fdc","DICT_Field":"rootlist","DICT_Name":"协议验证方法","DICT_Value":17},{"DICT_Uid":"f378a43cbf6c4afd9f23f699ad1f04e9","DICT_Field":"rootlist","DICT_Name":"协议类型","DICT_Value":18},{"DICT_Uid":"518feac188fc49daaeb3fd591f645dfe","DICT_Field":"rootlist","DICT_Name":"协议发布状态","DICT_Value":19},{"DICT_Uid":"01194c7944d04217a468b7c9d6b33fe4","DICT_Field":"rootlist","DICT_Name":"协议签订方式","DICT_Value":20},{"DICT_Uid":"dbb8120caa0f4e85800a0e4426741cf2","DICT_Field":"rootlist","DICT_Name":"协议签订状态","DICT_Value":21},{"DICT_Uid":"3d2aecec7e674267b4f78b0c74ceba49","DICT_Field":"rootlist","DICT_Name":"留言类型","DICT_Value":22},{"DICT_Uid":"32a8897373cc4ac486d60c33a895ec65","DICT_Field":"rootlist","DICT_Name":"留言状态","DICT_Value":23},{"DICT_Uid":"f88af877b443421683b17d0675ac1b1d","DICT_Field":"rootlist","DICT_Name":"消息类型","DICT_Value":24},{"DICT_Uid":"c0f20a52f5cd44279a414f210356bd21","DICT_Field":"rootlist","DICT_Name":"消息状态","DICT_Value":25},{"DICT_Uid":"e147ea368e10431b89aad45cbf0fa63a","DICT_Field":"rootlist","DICT_Name":"操作动作分类","DICT_Value":26},{"DICT_Uid":"d2ed72cedeaa49a394241265007ed92f","DICT_Field":"rootlist","DICT_Name":"门店类型","DICT_Value":27},{"DICT_Uid":"5592d07f8b934c05afbcba296156d2c4","DICT_Field":"rootlist","DICT_Name":"行业类型","DICT_Value":28},{"DICT_Uid":"6143e5f4e3a44718a0b41f6c64df17ba","DICT_Field":"rootlist","DICT_Name":"门店服务模式","DICT_Value":29},{"DICT_Uid":"d6a373827495402c9924a4bbee5651f7","DICT_Field":"rootlist","DICT_Name":"商户状态","DICT_Value":30},{"DICT_Uid":"ba96b5150d84439c9f7fb1bef049cda2","DICT_Field":"rootlist","DICT_Name":"买伴类型","DICT_Value":31},{"DICT_Uid":"e0de6fd01fef4533a7c97843959e1397","DICT_Field":"rootlist","DICT_Name":"买伴工作时段","DICT_Value":32},{"DICT_Uid":"938d421b0e8645afb8af9478f9d8f1d0","DICT_Field":"rootlist","DICT_Name":"买伴级别","DICT_Value":33},{"DICT_Uid":"48bc209889074459904e3f0403ab3037","DICT_Field":"rootlist","DICT_Name":"买伴状态","DICT_Value":34},{"DICT_Uid":"c3eb4f7d38b04932bbf3dc79379f4b4a","DICT_Field":"SHOP_Class","DICT_Name":"直营授权","DICT_Value":1},{"DICT_Uid":"fea1fc035ecc4527ac8381b720c7d824","DICT_Field":"SHOP_Class","DICT_Name":"综合业务","DICT_Value":2},{"DICT_Uid":"1dcef1f095544cefa6dfc96b95c27a26","DICT_Field":"SHOP_Class","DICT_Name":"委托运营","DICT_Value":3},{"DICT_Uid":"16f1e33f169e4f9e96744d1f4c0542d1","DICT_Field":"SHOP_Industry","DICT_Name":"彩票站","DICT_Value":1},{"DICT_Uid":"5ab70b0636294ffd9fb87e96e7984d40","DICT_Field":"SHOP_SeviceMode","DICT_Name":"人工服务","DICT_Value":1},{"DICT_Uid":"1ff1a5bceb764d6bbc799cc56a650dab","DICT_Field":"SHOP_SeviceMode","DICT_Name":"电子兑换机","DICT_Value":2},{"DICT_Uid":"45b25b41176946718802fe1482594e82","DICT_Field":"SHOP_State","DICT_Name":"待审","DICT_Value":0},{"DICT_Uid":"291560dc7a8b4dbf962965a17c69f37e","DICT_Field":"SHOP_State","DICT_Name":"运营中","DICT_Value":1},{"DICT_Uid":"1cdabc0537b243e8b6ad4833665ac80d","DICT_Field":"SHOP_State","DICT_Name":"暂停营业","DICT_Value":3},{"DICT_Uid":"9ea5113f56bc4f33a7d5ee063e1416f5","DICT_Field":"SHOP_State","DICT_Name":"撤销","DICT_Value":7},{"DICT_Uid":"0368c18a9d4e4c729297e0ebc6cb7896","DICT_Field":"USER_Class","DICT_Name":"小程序","DICT_Value":1},{"DICT_Uid":"5d116edc8f6943aba18248909914a2b4","DICT_Field":"USER_Class","DICT_Name":"公众号","DICT_Value":2}]

 * 
 */