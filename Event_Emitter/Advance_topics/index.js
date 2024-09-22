/** @format */

const Events = require("events");
class EventEmitter extends Events {}
const myEvent = new EventEmitter();

const buffer = [];

myEvent.on("task", (data) => {
  if (canProcess()) {
    processData(data);
  } else {
    buffer.push(data);
    console.log("Buffer after adding event:", buffer); // <-- Correct place to log buffer
  }
});

function canProcess() {
  return buffer.length === 0;
}

function processData(data) {
  setTimeout(() => {
    console.log("Here we completed one task", data);
    if (buffer.length > 0) {
      console.log("Current buffer before processing next task:", buffer); // <-- Correct buffer state before processing the next task
      processData(buffer.shift());
    } else {
      console.log("Buffer is now empty");
    }
  }, 1000);
}

myEvent.emit("task", "event 1");
myEvent.emit("task", "Event 2");
myEvent.emit("task", "event 3");
myEvent.emit("task", "event 4");

console.log("Initial buffer:", buffer); // <-- This will still print an empty array because events are not buffered yet
