'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

readFile('input.txt').then((text) => {
  const lines = text.split('\n');
  let x = 1;
  let c = 0;
  const signal = [];
  let output = '';

  lines.forEach((line) => {
    line = line.split(' ');
    if (line[0] === 'noop') {
      output += Math.abs(x - (c % 40)) <= 1 ? '#' : '.';
      c++;
      if ([20, 60, 100, 140, 180, 220].includes(c)) signal.push(c * x);
    }
    if (line[0] === 'addx') {
      output += Math.abs(x - (c % 40)) <= 1 ? '#' : '.';
      c++;
      if ([20, 60, 100, 140, 180, 220].includes(c)) signal.push(c * x);
      output += Math.abs(x - (c % 40)) <= 1 ? '#' : '.';
      c++;
      if ([20, 60, 100, 140, 180, 220].includes(c)) signal.push(c * x);
      x += +line[1];
    }
  });

  console.log(signal.reduce((a, b) => a + b, 0));
  console.log(output.match(/.{1,40}/g).join('\n'));
});
