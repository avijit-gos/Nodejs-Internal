/** @format */

const Emitter = require("events");
// const Emitter = require("./Custom");
class EventEmitter extends Emitter {}

const myEvent = new EventEmitter();

myEvent.on("buzz", () => {
  console.log("A buzz event occoured...->1");
});
myEvent.on("buzz", () => {
  console.log("A buzz event occoured...->1");
});
myEvent.on("buzz", () => {
  console.log("A buzz event occoured...->1");
});
myEvent.once("fizz", () => {
  console.log("An event occoured...->1");
});
// console.log(myEvent.listenerCount("buzz"));
// myEvent.emit("fizz");
// myEvent.emit("fizz");
// myEvent.emit("fizz");
myEvent.removeAllListeners("buzz");
myEvent.emit("buzz");
console.log(myEvent);
