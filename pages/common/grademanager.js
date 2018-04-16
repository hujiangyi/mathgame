var utils = require('../common/utils.js')
var gradeList = []
gradeList[0] = {
  desc: '10以内加法',
  subjectTypes: ['addition'],
  subjectCount: 20,
  leveltarget: [{ time: 150 }, { time: 120 }, { time: 90 }],
  levelmsg: ['150 秒内完成20道10以内加法', '120 秒内完成20道10以内加法', '90 秒内完成20道10以内加法', '最难的目标就是超越自己']
}
gradeList[1] = {
  desc: '10以内减法',
  subjectTypes: ['subtraction'],
  subjectCount: 20,
  leveltarget: [{ time: 150 }, { time: 120 }, { time: 90 }],
  levelmsg: ['150 秒内完成20道10以内减法', '120 秒内完成20道10以内减法', '90 秒内完成20道10以内减法', '最难的目标就是超越自己']
}
gradeList[2] = {
  desc: '20以内进位加法',
  subjectTypes: ['addWithCarry'],
  subjectCount: 20,
  leveltarget: [{ time: 150 }, { time: 120 }, { time: 90 }],
  levelmsg: ['150 秒内完成20道20以内进位加法', '120 秒内完成20道20以内进位加法', '90 秒内完成20道20以内进位加法', '最难的目标就是超越自己']
}
gradeList[3] = {
  desc: '20以内退位减法',
  subjectTypes: ['abdicationSubtraction'],
  subjectCount: 20,
  leveltarget: [{ time: 150 }, { time: 120 }, { time: 90 }],
  levelmsg: ['150 秒内完成20道20以内退位减法', '120 秒内完成20道20以内退位减法', '90 秒内完成20道20以内退位减法', '最难的目标就是超越自己']
}
gradeList[4] = {
  desc: '100以内简单加法',
  subjectTypes: ['addition100SimpleWeight'],
  subjectCount: 20,
  leveltarget: [{ time: 150 }, { time: 120 }, { time: 90 }],
  levelmsg: ['150 秒内完成20道100以内简单加法', '120 秒内完成20道100以内简单加法', '90 秒内完成20道100以内简单加法', '最难的目标就是超越自己']
}
gradeList[5] = {
  desc: '100以内复杂加法',
  subjectTypes: ['addition100ComplexWeight'],
  subjectCount: 20,
  leveltarget: [{ time: 150 }, { time: 120 }, { time: 90 }],
  levelmsg: ['150 秒内完成20道100以内复杂加法', '120 秒内完成20道100以内复杂加法', '90 秒内完成20道100以内复杂加法', '最难的目标就是超越自己']
}
gradeList[6] = {
  desc: '100以内简单减法',
  subjectTypes: ['subtraction100SimpleWeight'],
  subjectCount: 20,
  leveltarget: [{ time: 150 }, { time: 120 }, { time: 90 }],
  levelmsg: ['150 秒内完成20道100以内简单减法', '120 秒内完成20道100以内简单减法', '90 秒内完成20道100以内简单减法', '最难的目标就是超越自己']
}
gradeList[7] = {
  desc: '100以内复杂减法',
  subjectTypes: ['subtraction100ComplexWeight'],
  subjectCount: 20,
  leveltarget: [{ time: 150 }, { time: 120 }, { time: 90 }],
  levelmsg: ['150 秒内完成20道100以内复杂减法', '120 秒内完成20道100以内复杂减法', '90 秒内完成20道100以内复杂减法', '最难的目标就是超越自己']
}
var getGradeList = function () {
  return gradeList
};
exports.getGradeList = getGradeList;
var getMaxGrade = function () {
  return gradeList.length
};
exports.getMaxGrade = getMaxGrade;
var getSubjectCount = function (grade) {
  var gradeParam = gradeList[grade - 1];
  return gradeParam.subjectCount;
};
exports.getSubjectCount = getSubjectCount;
var getLevelMsg = function (grade, level) {
  var gradeParam = gradeList[grade - 1];
  var lm = gradeParam.levelmsg[level];
  return lm;
};
exports.getLevelMsg = getLevelMsg;
var getGrade = function (grade) {
  var gradeParam = gradeList[grade - 1];
  return gradeParam;
};
exports.getGrade = getGrade;
var getLevelTarget = function (grade) {
  var gradeParam = gradeList[grade - 1];
  return gradeParam.leveltarget;
};
exports.getLevelTarget = getLevelTarget;
var gradeLevelRecord = function (user, grade, level) {
  var gradeLevelList = utils.getStorageListSync(utils.getGradeLevel(user), [])
  gradeLevelList[grade - 1] = level
  utils.setStorageSync(utils.getGradeLevel(user), gradeLevelList)
  var userParam = utils.getStorageSync(utils.getParamKey(user), { grade: 1, level: 0 });
  userParam.grade = grade
  userParam.level = level
  utils.setStorageSync(utils.getParamKey(user), userParam)
};
exports.gradeLevelRecord = gradeLevelRecord;
var getLevelInGrade = function (user, grade) {
  var gradeLevelList = utils.getStorageListSync(utils.getGradeLevel(user), [])
  if (gradeLevelList.length > grade - 1 ) {
    if (gradeLevelList[grade - 1]) {
      return gradeLevelList[grade - 1]
    }  else {
      return 0
    }
  } else {
    return 0
  }
};
exports.getLevelInGrade = getLevelInGrade;