//读取key 如果不存在则返回defaultValue
var getStorageSync = function (key,defaultValue) {
  try {
    var value = wx.getStorageSync(key)
    if (value != null && value != '') {
      return value
    } else {
      return defaultValue
    }
  } catch (e) {
    return defaultValue
  }
};
exports.getStorageSync = getStorageSync;
//读取key 如果不存在或返回类型不是数组 则返回defaultValue
var getStorageListSync = function (key,defaultValue) {
  try {
    var list = wx.getStorageSync(key)
    if (list && list instanceof Array) {
      return list
    } else {
      return defaultValue
    }
  } catch (e) {
    return defaultValue
  }
};
exports.getStorageListSync = getStorageListSync;
//设置key的value
var setStorageSync = function (key, data) {
  try {
    wx.setStorageSync(key, data)
  } catch (e) {
    console.log('setStorageSync', key, data, e)
  }
};
exports.setStorageSync = setStorageSync;
var showinfo = function (options) {
  if (!options.showCancel) {
    options.showCancel = false
  }
  if (!options.confirmText) {
    options.confirmText = ' 确定'
  }
  if (!options.cancelText) {
    options.cancelText = '取消'
  }
  if (!options.complete) {
    options.complete = function (res) {
      wx.navigateBack()
    }
  }
  wx.showModal(options)
};
exports.showinfo = showinfo;
var randomNumBoth = function (min, max) {
  var range = max - min;
  var rand = Math.random();
  var num = min + Math.round(rand * range); //四舍五入
  return num;
};
exports.randomNumBoth = randomNumBoth;
//获得某个用户的某轮的key
var getRoundKey = function (user, roundNum) {
  return user + '_' + roundNum
};
exports.getRoundKey = getRoundKey;
//获得某个用户参数的key
var getParamKey = function (user) {
  return user + '_params'
};
exports.getParamKey = getParamKey;
//获得某个用户gradeLevel的key
var getGradeLevel = function (user) {
  return user + '_gradelevel'
};
exports.getGradeLevel = getGradeLevel;