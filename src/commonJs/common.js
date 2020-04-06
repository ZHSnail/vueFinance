/**
 * 
 * @param  time 时间戳
 */
function timestampToDate(time) {
    if (typeof(time) == "undefined") {
        return "";
    }
    var oDate = new Date(time),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间  
    return oTime;
}

//补0操作,当时间数据小于10的时候，给该数据前面加一个0  
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

/**
 * 获取当前时间 格式为yyyy-MM-dd 
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}
/**
 * 判断对象是否为空对象
 * @param {*} obj 
 */
function isEmptyObj(obj) {
    var arr = Object.keys(obj);
    return arr.length == 0;
}

function convertCurrency(money) {
    //汉字的数字
    var cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
    ); //基本单位
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //对应整数部分扩展单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应小数部分单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //整数金额时后面跟的字符
    var cnInteger = "整"; //整型完以后的单位
    var cnIntLast = "元"; //最大处理的数字
    var maxNum = 999999999999999.9999; //金额整数部分
    var integerNum; //金额小数部分
    var decimalNum; //输出的中文金额字符串
    var chineseStr = ""; //分离金额后用的数组，预定义
    var parts;
    if (money == "") {
        return "";
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        //超出最大处理数字
        return "";
    }
    if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    } //转换为字符串
    money = money.toString();
    if (money.indexOf(".") == -1) {
        integerNum = money;
        decimalNum = "";
    } else {
        parts = money.split(".");
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    } //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                } //归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    } //小数部分
    if (decimalNum != "") {
        var decLen = decimalNum.length;
        for (var j = 0; j < decLen; j++) {
            var a = decimalNum.substr(j, 1);
            if (a != "0") {
                chineseStr += cnNums[Number(a)] + cnDecUnits[j];
            }
        }
    }
    if (chineseStr == "") {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == "") {
        chineseStr += cnInteger;
    }
    return chineseStr;
}

/**
 * 检查验证是否通过
 * @param {Array} formArr el-form的ref数组，
 */
function checkForm(formArr) {
    return Promise.all(formArr.map(getFormPromise)).then(res => {
        const validateResult = res.every(item => !!item);
        return validateResult;
    });
}

function getFormPromise(form) {
    return new Promise(resolve => {
        form.validate(res => {
            resolve(res);
        })
    })
}

/**
 * 拷贝对象的值
 * @param {*} obj 
 */
function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 初始化对象
 * @param {Object} obj 对象
 */
function clearObj(obj) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] == "object") {
            if (obj[key] instanceof Array) {
                if (obj[key][0] instanceof Object) {
                    obj[key].splice(0, obj[key].length - 1);
                    clearObj(obj[key][0])
                } else {
                    obj[key] = []
                }
            } else if (obj[key] instanceof Object) {
                clearObj(obj[key]);
            }
        } else if (typeof obj[key] == "string") {
            if (obj[key] == "TRUE" || obj[key] == "FALSE") {
                obj[key] = "TRUE"
            } else {
                obj[key] = ""
            }
        } else if (typeof obj[key] == "number") {
            obj[key] = ""
        } else if (typeof obj[key] == "boolean") {
            obj[key] = true;
        }
    })
}
/**
 * 从数组中找含有某个值的对象
 * @param {Object} obj 对象
 * @param {Object} key 值
 * @param {Object} val 键
 */
function findObj(array, key, val) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === val) {
            return array[i];
        }
    }
}
export default {
    timestampToDate,
    getNowFormatDate,
    isEmptyObj,
    convertCurrency,
    checkForm,
    copyObj,
    clearObj,
    findObj
}