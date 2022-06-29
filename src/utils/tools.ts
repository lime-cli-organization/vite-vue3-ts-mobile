// 对象转params字符串
export const translateParams: (obj: Record<string, any>) => string = (obj) => {
  const arr = [];
  for (const key in obj) {
    arr.push(key + '=' + obj[key]);
  }
  return arr.join('&');
};
