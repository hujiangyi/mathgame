// pages/game/subjectList.js
var utils = require('../common/utils.js')
Page({
  onLoad: function (options) {
    try {
      var res = wx.getStorageInfoSync()
      console.log(res.keys)
      console.log(res.currentSize)
      console.log(res.limitSize)
    } catch (e) {
      // Do something when catch error
    }
    var user = options.user
    var roundNum = options.roundNum
    var key = utils.getRoundKey(user,roundNum)
    var sl = utils.getStorageListSync(key,[])
    this.setData({
      user: options.user,
      subjectList: sl,
    })
  }
})