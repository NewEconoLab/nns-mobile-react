const formatConfig = function (dateObj: Date) {
  return {
    "M+": dateObj.getMonth() + 1,                 // 月份 
    "d+": dateObj.getDate(),                    // 日 
    "h+": dateObj.getHours(),                   // 小时 
    "m+": dateObj.getMinutes(),                 // 分 
    "s+": dateObj.getSeconds(),                 // 秒 
    "q+": Math.floor((dateObj.getMonth() + 3) / 3), // 季度 
    "S": dateObj.getMilliseconds()             // 毫秒 
  }
};

export const format = function (fmt: string, dateNumber:string, locale:string) {

  const dateTimer = formatUnixTime(dateNumber.toString());
  const dateObj = new Date(dateTimer);
  console.log(dateTimer)
  // 如果是英文
  if(locale === 'en') {
    return new Date(dateTimer).toUTCString();
  }

  const o = formatConfig(dateObj);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

export const formatUnixTime = (dateNumber:string) => {
  return dateNumber.length === 10 ? parseInt(dateNumber, 10) * 1000 : parseInt(dateNumber, 10);
}
