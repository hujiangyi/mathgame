// pages/game/setting.js
var utils = require('../common/utils.js')
var grademanager = require('../common/grademanager.js')
Page({
  data: {
    grade: 1
  },
  onLoad: function (options) {
    this.setData({
      user: options.user
    })
    var gl = grademanager.getGradeList()
    var gradeDescs = []
    gl.forEach(function(item,index){
      gradeDescs[index] = item.desc
    })
    var g = options.grade
    this.setData({
      gradeList: gradeDescs,
      grade: g,
    })
  },
  bindPickerChange : function(e) {
    var g = parseInt(e.detail.value) + 1
    this.setData({
      grade: g
    })
  },
  ok : function() {
    var userParam = utils.getStorageSync(utils.getParamKey(this.data.user), { grade: 1, level: 0 }); 
    userParam.grade = this.data.grade
    userParam.level = grademanager.getLevelInGrade(this.data.user, this.data.grade)
    utils.setStorageSync(utils.getParamKey(this.data.user, userParam.grade), userParam)
    wx.navigateBack({ changed: true });
  },
  back: function () {
    wx.navigateBack({ changed: true });
  }

})