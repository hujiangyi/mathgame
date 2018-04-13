// pages/index/index.js
var utils = require('../common/utils.js')
var grademanager = require('../common/grademanager.js')
Page({
  data : {
    users : [], 
    userIndex : 0,
    grade : 1,
    level : 0,
    levelmsg : '',
    isHide :''
  },
  onShow: function () {
    var that = this;
    var users = ['未选择'];
    var storusers = utils.getStorageListSync('usernames',[]);
    var userIndex = utils.getStorageSync('userIndex',0);
    if (storusers.length + 1 < userIndex) {
      userIndex = 0;
    }
    if (userIndex == 0) {
      that.setData({
        isHide : 'hide'
      });
    } else {
      that.setData({
        isHide: 'show'
      });
    }
    users = users.concat(storusers)
    that.setData({
      users: users,
      userIndex: userIndex
    });
    var userParam = utils.getStorageSync(utils.getParamKey(users[userIndex]), { grade: 1, level: 0 }); 
    if (!userParam.grade) {
      userParam.grade = 1
      userParam.level = 0
      utils.setStorageSync(utils.getParamKey(users[userIndex]), userParam)
    }
    var lm = grademanager.getLevelMsg(userParam.grade, userParam.level);
    that.setData({
      grade : userParam.grade,
      level : userParam.level,
      levelmsg: lm
    });
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
        title: '提示',
        content: '别急，你的名字还没起好呢！',
        showCancel: false
      })
      return
    }
    wx.navigateTo({
      url: '../game/game?user=' + user + '&grade=' + d.grade + '&level=' + d.level 
    })
  },
  bindPickerChange : function(e){
    if (e.detail.value == 0) {
      this.setData({
        isHide: 'hide'
      });
    } else {
      this.setData({
        isHide: 'show'
      });
    }
    this.setData({
      userIndex: e.detail.value
    })
    utils.setStorageSync('userIndex', e.detail.value)
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
      url: '../game/achievement?user=' + user
    })
  },
  viewRanking: function (e) {
    wx.navigateTo({
      url: '../index/help'
    })
  }
})