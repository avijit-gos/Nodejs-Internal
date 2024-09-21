/** @format */

const Events = require("events");
class EventEmitter extends Events {}

const myevents = new EventEmitter();

myevents.on("fizz", (taskNo) => {
  console.log(`A task occoured with task number: ${taskNo}`);
});

myevents.on("buzz", () => {
  console.log("A buzz event occoured");
});

// for (let i = 0; i < 5000_000_00; i++) {
//   myevents.emit("fizz", i);
// }

const havyTask = (i = 0) => {
  while (i <= 5000_000_00) {
    myevents.emit("fizz", i);
    process.nextTick(() => havyTask(i + 1));
  }
};

myevents.emit("buzz");
console.log("#### All task completed ####");
