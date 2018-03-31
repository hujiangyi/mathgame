// pages/game/score.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    var sl = this.getStorageListSync(options.user)
    this.setData({
      user: options.user,
      scoreList: sl,
    })
  
  },
  getRoundKey: function (user, roundNum) {
    return user + '_' + roundNum
  },
  getStorageListSync: function (key) {
    try {
      var list = wx.getStorageSync(key)
      if (list && list instanceof Array) {
        return list
      }
    } catch (e) {
      console.log('getStorageListSync', key, e)
      return []
    }
  }
})