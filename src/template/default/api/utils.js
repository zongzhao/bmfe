/**
  * utils 底层方法封装
  */

// 将对象解析为对象字符串
export const stringify = (obj) => {
  let value = '';
  for (let prop in obj) {
    value += `${prop}=${obj[ prop ]}&`
  }
  return value.substr(0, value.length - 1)
}

// 获取浏览器search对象
const getQueryString = function() {
  var queryString = window.location.search;
  /* 去掉字符串前面的"?"，并把&amp;转换为& */
  queryString = queryString.replace(/^\?+/, '').replace(/&amp;/, '&');
  var querys = queryString.split('&'),
    i = querys.length,
    _URLParms = {},
    item;

  while (i--) {
    item = querys[i].split('=');
    if (item[0]) {
      var value = item[1] || '';
      try {
        value = decodeURIComponent(value);
      } catch (e) {
        value = unescape(value);
      }
      _URLParms[decodeURIComponent(item[0])] = value;
    }
  }
  return _URLParms;
};

export const page = location.pathname === '/monitor/zb' ? 'zb' : 'index'

/**
 * 截取浮点型n位小数
 * @param  {number} num          要截取的浮点数
 * @param  {number} decimalCount 保留number位小数
 * @param  {number} type 转换类型[0, 1, 2]，默认为截取法[0]，分别代表[0]截取法,[1]进位法,[2]四舍五入法
 * @return {[type]}              [description]
 */
export const subNumber = function(num, decimalCount, type) {
  if (!arguments[2]) type = 0;
  if (!num && num !== 0) return;
  if (typeof num !== 'number') return num;
  var str = num.toString();
  var arr = str.split('.');
  1 in arr && (arr[1] = arr[1].substring(0, decimalCount));
  var res = parseFloat(arr.join('.'));
  switch (type) {
    case 0:
      return res.toString();
    case 1:
      return (res + Math.pow(0.1, decimalCount)).toFixed(decimalCount).toString();
    case 2:
      return num.toFixed(decimalCount).toString();
  }
};

/**
 * 判断是否为空对象或者null
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export const isEmptyOrNull = function(obj){
  for (var i in obj) {
    return false;
  }
  return true;
};


// 时间格式化
export const dateFormat = (date, format) => {
  format = format || 'yyyy-MM-dd hh:mm:ss';
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[ k ] : `00${o[ k ]}`.substr(`${o[ k ]}`.length))
    }
  }
  return format
}

const _request = async(url, type, params = {}) => {
  const realParams = $.extend(true, {}, params, {
    timestamp: dateFormat(new Date())
  })

  return await new Promise((resolve, reject) => {
    $.ajax({
      url,
      type,
      data: stringify(realParams),
      dataType: 'json',
      timeout: 150000,
      success(res) {
        const { code, data, msg } = res;
        if (typeof code !== 'undefined') {
          code === 0 ? resolve(data) : reject(res)
        } else {
          resolve(res);
        }
      },
      error(res) {
        reject(res)
      }
    })
  }).catch(res => {
    if (res.statusText === 'timeout') {
      banma.ui.toast.warning('网络请求超时，请稍后重试！')
    } else if (res.msg) {
      banma.ui.toast.warning(res.msg)
    } else {
      banma.ui.toast.warning('网络请求错误，请稍后重试！')
    }
  })
}

export const getRequest = ({url, params}) => {
  return _request(url, 'GET', params);
}

export const postRequest = ({url, params}) => {
  return _request(url, 'POST', params);
}
