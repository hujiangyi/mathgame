var utils = require('../common/utils.js')
var grademanager = require('../common/grademanager.js')
var subjectTypes = []
var subjectList=[]
subjectTypes['addition'] = function () {
  var operator = '+'
  var firstNum = utils.randomNumBoth(1, 9)
  var range = 10 - firstNum
  var secondNum = utils.randomNumBoth(1, range)
  var result = firstNum + secondNum
  return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
};
subjectTypes['subtraction'] = function () {
  var operator = '-'
  var firstNum = utils.randomNumBoth(3, 10)
  var secondNum = utils.randomNumBoth(1, firstNum)
  var result = firstNum - secondNum
  return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
};
subjectTypes['addWithCarry'] = function () {
  var operator = '+'
  var firstNum = utils.randomNumBoth(1, 10)
  var rangeLow = 10 - firstNum
  var rangeHigh = 20 - firstNum
  var secondNum = utils.randomNumBoth(rangeLow, rangeHigh)
  var result = firstNum + secondNum
  return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
};
subjectTypes['abdicationSubtraction'] = function () {
  var operator = '-'
  var firstNum = utils.randomNumBoth(11, 19)
  var range = firstNum - 10
  var secondNum = utils.randomNumBoth(range, 9)
  var result = firstNum - secondNum
  return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
};
subjectTypes['addition100SimpleWeight'] = function () {
  var operator = '+'
  var firstNum = utils.randomNumBoth(20, 100)
  var sub = firstNum % 10
  var range = 10 - sub
  var secondNum = utils.randomNumBoth(1, range)
  var result = firstNum + secondNum
  return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
};
subjectTypes['addition100ComplexWeight'] = function () {
  var operator = '+'
  var firstNum = utils.randomNumBoth(20, 100)
  var ten = firstNum / 10
  var sub = firstNum % 10
  var range = 10 * (10 - ten) - sub
  var secondNum = utils.randomNumBoth(1, range)
  var result = firstNum + secondNum
  return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
};
subjectTypes['subtraction100SimpleWeight'] = function () {
  var operator = '-'
  var firstNum = utils.randomNumBoth(20, 100)
  var secondNum = utils.randomNumBoth(1, 10)
  var result = firstNum - secondNum
  return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
};
subjectTypes['subtraction100ComplexWeight'] = function () {
  var operator = '-'
  var firstNum = utils.randomNumBoth(20, 100)
  var secondNum = utils.randomNumBoth(11, firstNum)
  var result = firstNum - secondNum
  return { 'firstNum': firstNum, 'operator': operator, 'secondNum': secondNum, 'result': result }
};
var makeTypes = function(options){
  subjectList = []
  var userParam = utils.getStorageSync(utils.getParamKey(options.user),{grade:1,level:0})
  var gradeParam = grademanager.getGrade(userParam.grade)
  gradeParam.subjectTypes.forEach(function (item) {
    for (var i = 0; i < gradeParam.subjectCount * 1000; i++) {
      subjectList.push(subjectTypes[item])
    }
  })
  subjectList.sort(function () { return 0.5 - Math.random() });
}
exports.makeTypes = makeTypes;
var dispath = function () {
  var num = null
  do {
    num = Math.floor(Math.random() * subjectList.length);
  } while (subjectList[num] == null);
  var func = subjectList[num]
  subjectList[num] = null
  return func()
};
exports.dispath = dispath;