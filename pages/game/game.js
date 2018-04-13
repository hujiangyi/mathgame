// pages/username/game.js
var utils = require('../common/utils.js')
var makesubject = require('../common/makesubject.js')
var grademanager = require('../common/grademanager.js')
Page({
  data: {
    min: 0,
    sec: 0,
    timer:0,//计时
    total: 0,
    right: 0,
    wrong: 0,
    targetNumber : 0,
    firstNum : 0,
    operator : '+',
    secondNum : 0,
    result : '',
    preResult : 0,
    focus: false,
    types: [
    ]
  },    
  onLoad: function (options) {
    var allResult = utils.getStorageListSync(options.user,[])
    var that = this
    var d = that.data
    makesubject.makeTypes(options)
    var v = makesubject.dispath()
    that.setData({
      user: options.user,
      targetNumber: grademanager.getSubjectCount(options.grade),
      firstNum: v.firstNum,
      operator: v.operator,
      secondNum: v.secondNum,
      preResult : v.result,
      focus: true,
      roundNum: allResult.length,
      grade: parseInt(options.grade),
      level: parseInt(options.level)
    })
  },
  onReady : function(options) {
    var that = this;
    var d = that.data
    setInterval(function () {
      d.timer++  
      var m = parseInt(d.timer / 60)
      var s = parseInt(d.timer % 60)
      that.setData({
        min: m,
        sec: s,
        focus: true
      });
    }, 1000);
  } ,
  nextSubject :function () {
    var that = this
    var d = that.data
    var r = d.result
    if (r == null || r == '') {
      return
    }
    var rint = parseInt(r)
    var total = d.total + 1
    if (rint == d.preResult) {
      var right = d.right + 1
      that.setData({
        total: total,
        right: right
      });
    } else {
      var wrong = d.wrong + 1
      that.setData({
        total: total,
        wrong: wrong
      });
    }
    that.writeSubjectResult(d.firstNum, d.operator, d.secondNum, d.result, rint, rint == d.preResult)
    if (d.total == d.targetNumber) {
      that.writeRoundResult(d.user, d.total, d.right, d.wrong, d.timer)
      var leveltarget = grademanager.getLevelTarget(d.grade)
      var newlevel = 0
      leveltarget.forEach(function(item,index) {
        if (item.time > d.timer) {
          newlevel = index + 1
        }
      })
      var maxgrade = grademanager.getMaxGrade(d.user, d.grade, newlevel)
      var isShowCancel = true
      if (d.grade == maxgrade) {
        isShowCancel = false
      }
      if (newlevel > d.level && d.wrong == 0) {
        grademanager.gradeLevelRecord(d.user, d.grade, newlevel)
        utils.showinfo({
          title: 'info',
          content: '答题完成,总共' + d.total + '题，正确' + d.right + '题，错误' + d.wrong + '题。你创建了新纪录哦',
          showCancel: isShowCancel,
          confirmText: '继续挑战',
          cancelText: '下一等级',
          success: function (res) {
            if (res.confirm) {
              var userParam = utils.getStorageSync(utils.getParamKey(d.user), { grade: d.grade, level: d.level });
              var levelingrade = grademanager.getLevelInGrade(d.grade)
              if (newlevel > levelingrade) {
                levelingrade = newlevel
              }
              userParam.level = levelingrade
              utils.setStorageSync(utils.getParamKey(d.user), userParam)
            } else if (res.cancel) {
              var userParam = utils.getStorageSync(utils.getParamKey(d.user), { grade: d.grade, level: d.level });
              var newgrade = d.grade + 1
              var levelingrade = grademanager.getLevelInGrade(newgrade)
              userParam.grade = newgrade
              userParam.level = levelingrade
              utils.setStorageSync(utils.getParamKey(d.user), userParam)
            }
          }
        })
      } else {
        if (d.level > 0 && d.wrong == 0) {
          utils.showinfo({
            title: 'info',
            content: '答题完成,总共' + d.total + '题，正确' + d.right + '题，错误' + d.wrong + '题。',
            showCancel: isShowCancel,
            confirmText: '继续挑战',
            cancelText: '下一等级',
            success: function (res) {
              if (res.cancel) {
                var userParam = utils.getStorageSync(utils.getParamKey(d.user), { grade: d.grade, level: d.level });
                var newgrade = d.grade + 1
                var levelingrade = grademanager.getLevelInGrade(newgrade)
                userParam.grade = newgrade
                userParam.level = levelingrade
                utils.setStorageSync(utils.getParamKey(d.user), userParam)
              }
            }
          })
        } else {
          utils.showinfo({
            title: 'info',
            content: '答题完成,总共' + d.total + '题，正确' + d.right + '题，错误' + d.wrong + '题。'
          })
        }
      }
    } else{ 
      var v = makesubject.dispath()
      that.setData({
        firstNum: v.firstNum,
        operator: v.operator,
        secondNum: v.secondNum,
        preResult: v.result,
        result: '',
        focus: true
      });
    }
  },
  writeSubjectResult: function (firstNum, operator, secondNum, standard,result, isRight) {
    var key = utils.getRoundKey(this.data.user,this.data.roundNum)
    var subjectList = utils.getStorageListSync(key,[]) 
    subjectList.push({
      'firstNum': firstNum,
      'operator': operator,
      'secondNum': secondNum,
      'standard': standard,
      'result': result,
      'isRight': isRight
    })
    utils.setStorageSync(key, subjectList)
  },
  writeRoundResult : function (user, total, right, wrong, timer) {
    var roundList = utils.getStorageListSync(user,[])
    roundList.push({
      'total': total,
      'right': right,
      'wrong': wrong,
      'timer': timer
    })
    utils.setStorageSync(user, roundList)
  },
  resultInput : function (e) {
    this.setData({
      result: e.detail.value
    })
  }
})