// pages/username/game.js
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
    var allResult = this.getStorageListSync(options.user)
    var that = this
    var d = that.data
    that.makeTypes(options)
    var v = that.dispath()
    that.setData({
      user: options.user,
      targetNumber: options.targetNumber,
      firstNum: v.firstNum,
      operator: v.operator,
      secondNum: v.secondNum,
      preResult : v.result,
      focus : true,
      roundNum : allResult.length
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
      that.showinfo('info', '答题完成,总共' + d.total + '题，正确' + d.right + '题，错误' + d.wrong + '题。')
    } else{ 
      var v = that.dispath()
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
    var key = this.getRoundKey(this.data.user,this.data.roundNum)
    var subjectList = this.getStorageListSync(key) 
    subjectList.push({
      'firstNum': firstNum,
      'operator': operator,
      'secondNum': secondNum,
      'standard': standard,
      'result': result,
      'isRight': isRight
    })
    this.setStorageSync(key, subjectList)
  },
  writeRoundResult : function (user, total, right, wrong, timer) {
    var roundList = this.getStorageListSync(user)
    roundList.push({
      'total': total,
      'right': right,
      'wrong': wrong,
      'timer': timer
    })
    this.setStorageSync(user, roundList)
  },
  showinfo : function (t,msg) {
    wx.showModal({
      title: t,
      content: msg,
      success: function (res) {
        wx.navigateBack({ delta: 2 })
      }
    })
  },
  resultInput : function (e) {
    this.setData({
      result: e.detail.value
    })
  },
  dispath : function() {
    var num = null
    do {
      num = Math.floor(Math.random() * this.data.types.length);
    } while (this.data.types[num] == null);
    var func = this.data.types[num]
    this.data.types[num] = null
    return func()
  },
  makeTypes(options){
    var that = this
    var targetNumber = options.targetNumber
    var additionWeight = options.additionWeight
    var subtractionWeight = options.subtractionWeight
    var addWithCarryWeight = options.addWithCarryWeight
    var abdicationSubtractionWeight = options.abdicationSubtractionWeight
    var addition100SimpleWeight = options.addition100SimpleWeight
    var addition100ComplexWeight = options.addition100ComplexWeight
    var subtraction100SimpleWeight = options.subtraction100SimpleWeight
    var subtraction100ComplexWeight = options.subtraction100ComplexWeight
    //var totalCount = (additionWeight + subtractionWeight + addWithCarryWeight + abdicationSubtractionWeight) * targetNumber
    var types = []
    for (var i = 0; i < additionWeight * targetNumber; i++) {
      types.push(that.addition)
    }
    for (var i = 0; i < subtractionWeight * targetNumber; i++) {
      types.push(that.subtraction)
    }
    for (var i = 0; i < addWithCarryWeight * targetNumber; i++) {
      types.push(that.addWithCarry)
    }
    for (var i = 0; i < abdicationSubtractionWeight * targetNumber; i++) {
      types.push(that.abdicationSubtraction)
    }
    for (var i = 0; i < addition100SimpleWeight * targetNumber; i++) {
      types.push(that.addition100SimpleWeight)
    }
    for (var i = 0; i < addition100ComplexWeight * targetNumber; i++) {
      types.push(that.addition100ComplexWeight)
    }
    for (var i = 0; i < subtraction100SimpleWeight * targetNumber; i++) {
      types.push(that.subtraction100SimpleWeight)
    }
    for (var i = 0; i < subtraction100ComplexWeight * targetNumber; i++) {
      types.push(that.subtraction100ComplexWeight)
    }
    types.sort(function () {return 0.5 - Math.random()}); 
    that.setData({
      types: types
    });
  },
  addition: function () {
    var operator = '+'
    var firstNum = this.randomNumBoth(1,9)
    var range = 10 - firstNum
    var secondNum = this.randomNumBoth(1,range)
    var result = firstNum + secondNum
    return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result} 
  },
  subtraction: function () { 
    var operator = '-'
    var firstNum = this.randomNumBoth(3, 10)
    var secondNum = this.randomNumBoth(1, firstNum)
    var result = firstNum - secondNum
    return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result } 
  },
  addWithCarry: function () {
    var operator = '+'
    var firstNum = this.randomNumBoth(1, 10)
    var rangeLow = 10 - firstNum
    var rangeHigh = 20 - firstNum
    var secondNum = this.randomNumBoth(rangeLow, rangeHigh)
    var result = firstNum + secondNum
    return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
  },
  abdicationSubtraction: function () {
    var operator = '-'
    var firstNum = this.randomNumBoth(11, 19)
    var range = firstNum - 10
    var secondNum = this.randomNumBoth(range, 9)
    var result = firstNum - secondNum
    return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
  },
  addition100SimpleWeight: function () {
    var operator = '+'
    var firstNum = this.randomNumBoth(20, 100)
    var sub = firstNum % 10
    var range = 10 - sub
    var secondNum = this.randomNumBoth(1, range)
    var result = firstNum + secondNum
    return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
  },
  addition100ComplexWeight: function () {
    var operator = '+'
    var firstNum = this.randomNumBoth(20, 100)
    var ten = firstNum / 10
    var sub = firstNum % 10
    var range = 10 * (10 - ten) - sub
    var secondNum = this.randomNumBoth(1, range)
    var result = firstNum + secondNum
    return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
  },
  subtraction100SimpleWeight: function () {
    var operator = '-'
    var firstNum = this.randomNumBoth(20, 100)
    var secondNum = this.randomNumBoth(1, 10)
    var result = firstNum - secondNum
    return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
  },
  subtraction100ComplexWeight: function () {
    var operator = '-'
    var firstNum = this.randomNumBoth(20, 100)
    var secondNum = this.randomNumBoth(11, firstNum)
    var result = firstNum - secondNum
    return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
  },
  randomNumBoth : function (min, max){
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
  },
  getRoundKey : function (user,roundNum) {
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
  setStorageSync : function(key, data) {
    try {
      wx.setStorageSync(key, data)
    } catch (e) {
      console.log('setStorageSync',key,data,e)
    }
  }
    
})