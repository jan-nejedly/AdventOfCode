'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function compare(left, right) {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) return true;
    if (left > right) return false;
    return;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      const result = compare(left[i], right[i]);
      if (result != null) return result;
    }
    return compare(left.length, right.length);
  }

  return compare([left].flat(), [right].flat());
}

function countErrors(packets) {
  const errors = [];
  for (let i = 0; i < packets.length; i++) {
    packets[i][0] = JSON.parse(packets[i][0]);
    packets[i][1] = JSON.parse(packets[i][1]);
    if (compare(packets[i][0], packets[i][1])) errors.push(i + 1);
  }
  return errors.reduce((sum, error) => sum + error, 0);
}

function getDecoderKey(packets) {
  const dividers = [[[2]], [[6]]];
  packets = [...packets.flat(), ...dividers];
  const sortedPackets = packets.sort((l, r) => compare(r, l) - compare(l, r));
  let decoderKey = 1;
  sortedPackets.forEach((packet, i) => {
    if (dividers.includes(packet)) decoderKey *= i + 1;
  });
  return decoderKey;
}

readFile('input.txt').then((input) => {
  let packets = input.split('\n\n').map((packet) => packet.split('\n'));
  console.log('Part One: ' + countErrors(packets));
  console.log('Part Two: ' + getDecoderKey(packets));
});
