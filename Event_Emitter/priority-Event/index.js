/** @format */

// const Event = require("events");
const Event = require("./custom");
class EventEmitter extends Event {}
const myEvent = new EventEmitter();

function highestPriority(data) {
  console.log("Highest proiority event", data);
}
function mediumPriority(data) {
  console.log("Medium priority", data);
}
function lowestPriority(data) {
  console.log("Lowest priority", data);
}

myEvent.once("event", lowestPriority, 1);
myEvent.once("event", highestPriority, 10);
myEvent.once("event", mediumPriority, 5);

myEvent.emit("event", "occoured");
