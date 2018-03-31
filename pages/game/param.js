// pages/param.js
Page({
  data: {
    targetNumber: 20,
    additionWeight: 1,
    subtractionWeight: 1,
    addWithCarryWeight: 1,
    abdicationSubtractionWeight: 1,
    addition100SimpleWeight: 1,
    addition100ComplexWeight: 1,
    subtraction100SimpleWeight: 1,
    subtraction100ComplexWeight: 1
  },
  onLoad: function (options) {
    var key = this.getParamKey(options.user)
    var params = this.getStorageSync(key)
    if (params.addition100SimpleWeight == undefined) {
      params.addition100SimpleWeight = 1
      params.addition100ComplexWeight = 1
      params.subtraction100SimpleWeight = 1
      params.subtraction100ComplexWeight = 1
    }
    this.setData({
      user: options.user,
      targetNumber: params.targetNumber,
      additionWeight: params.additionWeight,
      subtractionWeight: params.subtractionWeight,
      addWithCarryWeight: params.addWithCarryWeight,
      abdicationSubtractionWeight: params.abdicationSubtractionWeight,
      addition100SimpleWeight: params.addition100SimpleWeight,
      addition100ComplexWeight: params.addition100ComplexWeight,
      subtraction100SimpleWeight: params.subtraction100SimpleWeight,
      subtraction100ComplexWeight: params.subtraction100ComplexWeight

    })
  },
  startGame : function(){
    var that = this
    var d = that.data
    var key = this.getParamKey(d.user)
    var params = {
      targetNumber: d.targetNumber,
      additionWeight: d.additionWeight,
      subtractionWeight: d.subtractionWeight,
      addWithCarryWeight: d.addWithCarryWeight,
      abdicationSubtractionWeight: d.abdicationSubtractionWeight,
      addition100SimpleWeight: d.addition100SimpleWeight,
      addition100ComplexWeight: d.addition100ComplexWeight,
      subtraction100SimpleWeight: d.subtraction100SimpleWeight,
      subtraction100ComplexWeight: d.subtraction100ComplexWeight
    }
    this.setStorageSync(key,params)
    wx.navigateTo({
      url: '../game/game?user=' + d.user + '&targetNumber=' + d.targetNumber + '&additionWeight=' + d.additionWeight + '&subtractionWeight=' + d.subtractionWeight + '&addWithCarryWeight=' + d.addWithCarryWeight + '&abdicationSubtractionWeight=' + d.abdicationSubtractionWeight + '&addition100SimpleWeight=' + d.addition100SimpleWeight + '&addition100ComplexWeight=' + d.addition100ComplexWeight + '&subtraction100SimpleWeight=' + d.subtraction100SimpleWeight + '&subtraction100ComplexWeight=' + d.subtraction100ComplexWeight
    })
  },
  targetNumber: function (e) {
    this.setData({
      targetNumber: e.detail.value
    })
  },
  additionWeight: function (e) {
    this.setData({
      additionWeight: e.detail.value
    })
  },
  subtractionWeight: function (e) {
    this.setData({
      subtractionWeight: e.detail.value
    })
  },
  addWithCarryWeight: function (e) {
    this.setData({
      addWithCarryWeight: e.detail.value
    })
  },
  abdicationSubtractionWeight: function (e) {
    this.setData({
      abdicationSubtractionWeight: e.detail.value
    })
  },
  addition100SimpleWeight: function (e) {
    this.setData({
      addition100SimpleWeight: e.detail.value
    })
  },
  addition100ComplexWeight: function (e) {
    this.setData({
      addition100ComplexWeight: e.detail.value
    })
  },
  subtraction100SimpleWeight: function (e) {
    this.setData({
      subtraction100SimpleWeight: e.detail.value
    })
  },
  subtraction100ComplexWeight: function (e) {
    this.setData({
      subtraction100ComplexWeight: e.detail.value
    })
  },
  getParamKey : function (user) {
    return user + '_params'
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
  setStorageSync: function (key, data) {
    try {
      wx.setStorageSync(key, data)
    } catch (e) {
      console.log('setStorageSync', key, data, e)
    }
  }
})