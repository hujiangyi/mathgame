// pages/username/username.js
Page({
  data :{
    username : null
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  ok: function () {
    var usernames = null
    try {
      usernames = wx.getStorageSync('usernames')
      if (!(usernames instanceof Array)) {
        usernames = []
      }
    } catch (e) {
      usernames = []
    }
    usernames.push(this.data.username)
    wx.setStorageSync('usernames', usernames)
    wx.setStorageSync('userIndex', usernames.length)
    wx.navigateBack({ changed: true }); 
  },
  back: function () {
    wx.navigateBack({ changed: true }); 
  }
})