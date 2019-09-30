function removeKey(key) {
  process.browser && localStorage.removeItem(key);
}

function setKeyWithValue(key, value) {
  process.browser && localStorage.setItem(key, value);
}

function getValue(key) {
  return process.browser && localStorage.getItem(key);
}

export function setUserId(value) {
  setKeyWithValue('userID', value);
}
export function getUserId() {
  return getValue('userID');
}

export function setExpries() {
  const time = new Date().getTime();
  setKeyWithValue('expries', time);
}
export function getExpries() {
  return getValue('expries');
}

export function setUserEmail(value) {
  setKeyWithValue('userEmail', value);
}
export function getUserEmail() {
  return getValue('userEmail') || '';
}

export function setSessionId(value) {
  setKeyWithValue('sessionId', value);
}
export function getSessionId() {
  return getValue('sessionId');
}

export function setLoginProvider(value) {
  setKeyWithValue('loginProvider', value);
}
export function getLoginProvider() {
  return getValue('loginProvider');
}

export function getIsDevelopment() {
  return getValue('isDevelopment');
}
// main pikx
export function clearBookingId() {
  removeKey('booking_id');
}
export function clearCartData() {
  removeKey('cart_items');
  removeKey('totalPayable');
  removeKey('totalCartItems');
}

export function getCartItems() {
  return JSON.parse(localStorage.getItem('cart_items'));
}
export function getTotalPayable() {
  let  x= localStorage.getItem('totalPayable');
  console.log('x',x);
  return JSON.parse(localStorage.getItem('totalPayable'));
}
export function getTotalCartItems() {
  return JSON.parse(localStorage.getItem('totalCartItems'));
}

export function setCartItems(cart_items) {
  localStorage.setItem('cart_items',JSON.stringify(cart_items))
}
    
export function setTotalPayable(totalPayable) {
  localStorage.setItem('totalPayable',JSON.stringify(totalPayable))
}  

export function setTotalCartItems(totalCartItems) {
  localStorage.setItem('totalCartItems',JSON.stringify(totalCartItems))
}
