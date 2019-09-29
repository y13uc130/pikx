export function addCommas(nStr) {
  nStr = Math.round(nStr);
  nStr += '';
  let x = nStr.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? ',' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

export function isProd() {
  return process.browser && window.location.host.includes('perniaspopupshop.com');
}
export const validateConfirmPassword = (newpassword, value) => {
  let error;
  if(!value) {
    error = 'Required';
  } else if (value !== newpassword) {
    error = "Password doesn't match";
  }
  return error;
}

export function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

export function validateRequired(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}

export function validatePhone(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!isNaN(value) && (String(value).length < 10 || String(value).length > 15)) {
    error = 'Invalid phone number';
  }
  return error;
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function scrollTo(element, to, duration=200) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function scrollOnHtml(offsetTop) {
  const htmlElement = document.querySelector('html');
  const bodyElement = document.querySelector('body'); // for safari browser
  scrollTo(htmlElement, offsetTop);
  scrollTo(bodyElement, offsetTop);
}

export function scrollOnHtmlFast(offsetTop) {
  const htmlElement = document.querySelector('html');
  const bodyElement = document.querySelector('body'); // for safari browser
  htmlElement.scrollTop = offsetTop;
  bodyElement.scrollTop = offsetTop;
}

export function objectToQuerystring (obj) {
  return Object.keys(obj).reduce(function (str, key, i) {
    var delimiter, val;
    delimiter = (i === 0) ? '?' : '&';
    key = encodeURIComponent(key);
    val = encodeURIComponent(obj[key]);
    return [str, delimiter, key, '=', val].join('');
  }, '');
}

export function removeLastCharFromStr(str='') {
  return str.charAt(str.length - 1) === '/' ? str.slice(0, str.length-1) : str;
}