// pages/index/index.js
Page({
  data: {
    users: [], 
    userIndex : 0,
    uuid : null
  },
  onShow: function () {
    var that = this
    var users = ['未选择']
    var storusers = that.getStorageListSync('usernames')
    var userIndex = that.getStorageSync('userIndex')
    if (storusers.length + 1 < userIndex) {
      userIndex = 0
    }
    users = users.concat(storusers)
    that.setData({
      users: users,
      userIndex: userIndex
    })
  },
  regist: function () {
    wx.navigateTo({
      url: '../username/username'
    })
  },
  startgame: function () {
    var that = this
    var d = that.data
    var user = d.users[d.userIndex]
    if (d.userIndex == 0) {
      wx.showModal({
        title:'提示',
        content : '未选择参与游戏的用户！'
      })
      return
    }
    wx.navigateTo({
      url: '../game/param?user=' + user
    })
  },
  bindPickerChange : function(e){
    this.setData({
      userIndex: e.detail.value
    })
    wx.setStorageSync('userIndex', e.detail.value)
  },
  viewScore: function (e) {
    var that = this
    var d = that.data
    var user = d.users[d.userIndex]
    if (d.userIndex == 0) {
      wx.showModal({
        title: '提示',
        content: '未选择参与游戏的用户！'
      })
      return
    }
    wx.navigateTo({
      url: '../game/score?user=' + user
    })
  },
  viewRanking: function (e) {
    wx.navigateTo({
      url: '../index/help'
    })
  },
  getUUIDKey(userIndex) {
    return 'uuid'+userIndex
  },
  getStorageSync: function (key) {
    try {
      var list = wx.getStorageSync(key)
      if (list != null && list != '') {
        return list
      } else {
        return this.data
      }
    } catch (e) {
      console.log('getStorageSync', key, e)
      return this.data
    }
  },
  getStorageObjectSync: function (key) {
    try {
      var value = wx.getStorageSync(key)
      if (value != null && value != '') {
        return value
      } else {
        return null
      }
    } catch (e) {
      console.log('getStorageSync', key, e)
      return null
    }
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