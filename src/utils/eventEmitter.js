import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export const addEvents = (eventName, callback) => {
  eventEmitter.on(eventName, callback)
}

export const removeEvents = (eventName, callback) => {
  eventEmitter.removeListener(eventName, callback)
}

export const emitEvents = (eventName, data) => {
  eventEmitter.emit(eventName, data)
}