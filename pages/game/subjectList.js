// pages/game/subjectList.js
Page({
  data: {
  
  },
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
    var key = this.getRoundKey(user,roundNum)
    var sl = this.getStorageListSync(key)
    this.setData({
      user: options.user,
      subjectList: sl,
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
      } else {
        return []
      }
    } catch (e) {
      console.log('getStorageListSync', key, e)
      return []
    }
  },
  setStorageSync: function (key, data) {
    try {
      wx.setStorageSync(key, data)
    } catch (e) {
      console.log('setStorageSync', key, data, e)
    }
  }
})