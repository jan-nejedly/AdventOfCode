'use strict';

async function readFile() {
  const input = await fetch('input.txt');
  const text = await input.text();
  return text;
}

readFile().then((text) => {
  const calories = text.split('\n');
  let elves = [];
  let sum = 0;
  calories.forEach((cal) => {
    if (cal == '') {
      elves.push(sum);
      sum = 0;
    } else {
      sum += Number(cal);
    }
  });

  console.log(Math.max(...elves));

  elves.sort((a, b) => a - b);
  // console.log(elves);
  // console.log(elves.slice(-3));
  console.log(elves.slice(-3).reduce((a, b) => a + b, 0));
});
