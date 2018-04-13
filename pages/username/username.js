// pages/username/username.js 
var utils = require('../common/utils.js')
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
    var usernames = utils.getStorageListSync('usernames',[])
    if (usernames.indexOf(this.data.username) != -1) {
      utils.showinfo({
        title: 'info',
        content: "不要和别人用一样的名字么。",
        complete: function (res) {
        }
      })
    } else {
      usernames.push(this.data.username)
      utils.setStorageSync('usernames', usernames)
      utils.setStorageSync('userIndex', usernames.length)
      wx.navigateBack({ changed: true }); 
    }
  },
  back: function () {
    wx.navigateBack({ changed: true }); 
  }
})