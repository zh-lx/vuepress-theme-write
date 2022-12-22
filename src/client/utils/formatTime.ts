// 格式化时间戳
export function formatTime(time: number, fmt: string) {
  const date = new Date(time);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      );
    }
  }
  return fmt;
}

export const convertTimeStringToNumber = (str) => {
  if (!/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/.test(str)) {
    return 0;
  }
  return new Date(str).getTime();
};
