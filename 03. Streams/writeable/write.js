/** @format */

const fs = require("node:fs");

(async (filename, number) => {
  const stream = fs.createWriteStream(filename, { highWaterMark: 1684 });
  let i = 0;
  const writeMany = () => {
    while (i < number) {
      i++;
      if (!stream.write(Buffer.from(` ${i} `))) {
        return;
      }
      if (i === number) {
        stream.end();
      }
    }
  };
  writeMany();

  stream.on("drain", () => {
    writeMany();
  });

  stream.on("error", () => {
    console.log("Error occoured...");
  });

  stream.on("finish", () => {
    console.log("Write stream end!!!");
  });
})("nums.txt", 100_000_00);
