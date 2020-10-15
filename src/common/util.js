import moment, { HTML5_FMT } from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export const yesterday = moment().subtract(1, 'days')

export function getUrl(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.href.split('?')[1] ? window.location.href.split('?')[1].match(reg) : null
  if (r != null) {
    if (r[2] == 'undefined' || r[2] == '') {
      return null
    }
    return decodeURIComponent(r[2])
  }
  return null
}

/**
 * 生成guid
 * @returns {string}
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function encode(str) {
  const replacer = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
  }
  return encodeURIComponent(str).replace(/[!'()]/g, (match) => replacer[match])
}

export function stringify(obj, prefix) {
  if (obj === null) obj = 'null'

  let queue = []

  if (obj instanceof Date) {
    queue.push(`${encode(prefix)}=${encode(Date.prototype.toISOString.call(obj))}`)
  } else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    queue.push(`${encode(prefix)}=${encode(obj)}`)
  } else if (/\[object (Object|Array)\]/.test(Object.prototype.toString.call(obj))) {
    const keys = Object.keys(obj)
    let key, i
    for (i = 0; i < keys.length; i++) {
      key = keys[i]
      queue = queue.concat(stringify(obj[key], prefix ? `${prefix}[${key}]` : key))
    }
  }

  return queue
}

// 唯一key值
export function uniqueCode() {
  return Number(Math.random().toString().substr(-5) + Date.now()).toString(36).substr(-5);
}

// 解析数据为null或者undefined，为 ‘-’
export function parseZero(num) {
  return num === null || num === undefined ? '-' : num
}

export function debounce(fn, wait) {    
  let timeout = null;    
  return () => {        
    if(timeout !== null) clearTimeout(timeout);        
    timeout = setTimeout(fn, wait);    
  }
}