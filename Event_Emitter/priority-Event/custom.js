/**
 * module.exports = class CustomEvents {
 *   priorityEvents = new Map();
 *   addEventListener(eventname, fn, priority = 0) {
 *     if (!this.priorityEvents.has(eventname)) {
 *       this.priorityEvents.set(eventname, []);
 *     }
 *     // push listener to the event with their priority
 *     this.priorityEvents.get(eventname).push({ fn, priority });
 *     this.priorityEvents.get(eventname).sort((a, b) => b.priority - a.priority);
 *     return this;
 *   }
 *
 *   on(eventname, fn, priority) {
 *     this.addEventListener(eventname, fn, priority);
 *   }
 *
 *   emit(eventname, ...args) {
 *     if (!this.priorityEvents.has(eventname)) {
 *       return false;
 *     } else {
 *       for (const { fn } of this.priorityEvents.get(eventname)) {
 *         fn(...args);
 *       }
 *       return true;
 *     }
 *   }
 * };
 *
 * @format
 */

module.exports = class CustomEvents {
  _eventListener = {};

  addEvenListener(eventname, listener, priority) {
    this._eventListener[eventname] = this._eventListener[eventname] || [];
    this._eventListener[eventname].push({ listener, priority });
    this._eventListener[eventname].sort((a, b) => b.priority - a.priority);
    return this;
  }

  on(eventname, listener, priority) {
    if (!priority) {
      this.addEvenListener(eventname, listener, (priority = 0));
    } else {
      this.addEvenListener(eventname, listener, priority);
    }
    return this;
  }

  once(eventname, listener, priority) {
    this._eventListener[eventname] = this._eventListener[eventname] || [];

    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventname, listener);
    };

    this._eventListener[eventname].push({ listener: onceWrapper, priority });
    this._eventListener[eventname].sort((a, b) => b.priority - a.priority);
    console.log(this._eventListener);
  }

  off(eventname, listener) {
    this._eventListener[eventname] = this._eventListener[eventname].filter(
      (lis) => lis !== listener
    );
  }

  emit(eventname, ...args) {
    const fns = this._eventListener[eventname];
    if (!fns) return false;
    
    for (const { listener } of fns) {
      listener(...args);
    }
    return this;
  }
};
