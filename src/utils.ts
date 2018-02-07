export const wait = t => (res, rej) => (res, t) =>
  setTimeout(() => {
    res(true);
  }, t);

export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export const until = (cond, time) =>
  cond().then(result => result || delay(time).then(() => until(cond, time)));

export const has = (object, key) =>
  object ? Object.prototype.hasOwnProperty.call(object, key) : false;

export const entries = obj => {
  const res = [];
  for (const key of obj) {
    if (has(obj, key)) {
      res.push([key, obj[key]]);
    }
  }
  return res;
};
export const toObj = arr =>
  (<any>Object).assign(...arr.map(([k, v]) => ({ [k]: v })));

export const isObject = O =>
  Object.prototype.toString.call(O) === '[object Object]';
