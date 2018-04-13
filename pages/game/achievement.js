// pages/game/achievement.js
var utils = require('../common/utils.js')
var grademanager = require('../common/grademanager.js')
Page({
  data: {
    medalList : [],
    summaryMsg : '还未获得任何勋章和星星，继续去努力吧。'
  },
  onLoad: function (options) {
    this.setData({
      user: options.user
    })
    var gl = grademanager.getGradeList()  
    var gradeLevelList = utils.getStorageListSync(utils.getGradeLevel(options.user), [])
    var ml = []
    var totalStart = 0
    gl.forEach(function(item,index){
      if (gradeLevelList[index]) {
        ml[ml.length] = {
          desc: item.desc,
          level: gradeLevelList[index]
        }
        totalStart = totalStart + gradeLevelList[index]
      }
    });
    if (ml.length > 0) {
      this.setData({
        medalList: ml,
        summaryMsg : '你获得了' + ml.length + '个勋章,' + totalStart + '颗星星，干得不错哦，继续努力!'
      })
    }
  }, 
  viewScore: function (e) {
    wx.navigateTo({
      url: '../game/score?user=' + this.data.user
    })
  }
})