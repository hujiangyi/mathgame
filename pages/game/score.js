// pages/game/score.js
var utils = require('../common/utils.js')
Page({
  onLoad: function (options) {
    var sl = utils.getStorageListSync(options.user,[])
    this.setData({
      user: options.user,
      scoreList: sl,
    })
  }
})