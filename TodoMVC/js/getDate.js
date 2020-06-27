//按照YYYY-MM-DD的格式得到当天日期
export function getCurrentDate() {
    var date = new Date();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    var seperator = "-";
    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }
    // 对日期进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    //拼接字符串，格式为yyyy-MM-dd
    var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
    return nowDate;
}
//按照YYYY-MM-DD的格式得到明天日期
export function getTomorrowDate() {
    var date = new Date();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate() + 1;
    var seperator = "-";
    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }
    // 对日期进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    //拼接字符串，格式为yyyy-MM-dd
    var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
    return nowDate;
}
//按照YYYY-MM-DD的格式得到明年今天日期
export function getNextYearDate() {
    var date = new Date();
    var nowYear=date.getFullYear() + 1;
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    var seperator = "-";
    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }
    // 对日期进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    //拼接字符串，格式为yyyy-MM-dd
    var nowDate = nowYear + seperator + nowMonth + seperator + strDate;
    return nowDate;
}
//比较日期
//date1>=date2 返回true
export function dateCompare(date1, date2) {
    for (let i = 0; i < 10; ++i) {
        if (date1[i] < date2[i]) {
            return false;
        }
        else if (date1[i] > date2[i]) {
            return true;
        }
    }
    return true;
}
