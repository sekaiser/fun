import { pretty } from 'js-object-pretty-print';
import {
  has,
  entries,
  toObj,
  isObject,
  isBoolean,
  isString,
  isNumber,
} from './utils';

export const curry = fn => (...args) => fn.bind(null, ...args);

export const map = curry((fn, arr) => arr.map(fn));

export const reduce = curry((x, fn, arr) => arr.reduce(fn, x));

export const join = curry((str, arr) => arr.join(str));

export const tap = curry((fn, x) => {
  fn(x);
  return x;
});

export const trace = label =>
  tap(x => console.log(`== ${label}:\n` + pretty(x)));

export const fmap = (...fns) => x => fns.map(fn => fn(x));

export const split = curry((splitOn, str) => str.split(splitOn));

export const filter = curry(
  (filterOn, O) =>
    Array.isArray(O)
      ? O.filter(filterOn)
      : isObject(O) ? toObj(entries(O).filter(filterOn)) : O,
);

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

/**
 * This method takes a reducer function and an initial value (`x`). We iterate over the array
 * functions (from right to left), applying each in turn to the accumulated value (`v`).
 */
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

export const substr = curry((start, end, str) =>
  str.substring(str.indexOf(start) + 1, str.indexOf(end)),
);
export const take = curry((n: number, arr: any[]) => {
  const result = [];
  let l = n;
  for (let i = 0; i < arr.length && l > 0; i += 1, l -= 1) {
    result.push(arr[i]);
  }
  return result;
});

export const rename = (val, fn) => {
  if (val === undefined || val === null) return val;
  if (isString(val)) return val;
  if (isNumber(val)) return val;
  if (isBoolean(val)) return val;

  if (isObject(val)) {
    return Object.keys(val).reduce((acc, key) => {
      const newKey = fn(key);
      const temp = rename(acc[key], fn);
      acc[key] = null;
      acc[newKey] = temp;
      return acc;
    }, val);
  }
  if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i += 1) {
      val[i] = rename(val[i], fn);
    }
  }
  return val;
};

export const renameKeys = curry((keyMap, val) => {
  if (keyMap === undefined) return val;

  if (isObject(val)) {
    return Object.keys(keyMap).reduce((acc, oldName) => {
      if (has(val, oldName)) {
        const newName = keyMap[oldName];
        const temp = acc[oldName];
        delete acc[oldName];
        acc[newName] = temp;
      }
      return acc;
    }, val);
  }
  if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i += 1) {
      if (has(keyMap, val[i][0])) {
        val[i][0] = keyMap[val[i][0]];
      }
    }
    return val;
  }

  return val;
});
