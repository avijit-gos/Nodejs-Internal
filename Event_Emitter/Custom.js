/** @format */

module.exports = class CustomEvent {
  _listeners = {
    _events: {},
    _eventsCount: 0,
  };

  // Add event listener
  addEventListener(eventname, fn) {
    this._listeners._events[eventname] =
      this._listeners._events[eventname] || [];
    // increment _eventcount by 1 if there is no event exists
    if (this._listeners._events[eventname].length === 0) {
      this._listeners._eventsCount = this._listeners._eventsCount + 1;
    }
    this._listeners._events[eventname].push(fn);
    return this;
  }

  // ON event
  on(eventname, fn) {
    this.addEventListener(eventname, fn);     
  }

  // ONCE event
  once(eventname, fn) {
    this._listeners._events[eventname] =
      this._listeners._events[eventname] || [];
    // if the event is not already exists then increment the _eventsCount by 1
    if (this._listeners._events[eventname].length === 0) {
      this._listeners._eventsCount = this._listeners._eventsCount + 1;
    }
    const wrapper = (...args) => {
      fn(...args);
      this.removeListener(eventname, wrapper);
    };

    this._listeners._events[eventname].push(wrapper);
  }

  // remove listener
  removeListener(eventname, fn) {
    this._listeners._events[eventname] = this._listeners._events[
      eventname
    ].filter((list) => list !== fn);
    this._listeners._eventsCount = this._listeners._eventsCount - 1;
    delete this._listeners._events[eventname];
    return this;
  }

  // Triggering events
  emit(eventname, ...args) {
    let fns = this._listeners._events[eventname] || [];
    if (!fns) return false;
    for (let i = 0; i < fns.length; i++) {
      fns[i](...args);
    }
    return this;
  }

  // listenerCount
  listenerCount(eventname) {
    let fns = this._listeners._events[eventname] || [];
    return fns.length;
  }
};
