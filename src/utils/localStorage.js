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

export function clearLocalStorage() {
  removeKey('userID');
  removeKey('sessionId');
  removeKey('expries');
  removeKey('loginProvider');
}