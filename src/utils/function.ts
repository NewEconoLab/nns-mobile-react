// 将数字转化为 最多8位的 字符串 如 0.00000001
export function toNonExponential(num: number) {
  const m: any = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  let fiexed = Math.max(0, (m[1] || '').length - m[2]);
  if (fiexed && fiexed > 8) {
    fiexed = 8;
  }
  return num.toFixed(fiexed);
}