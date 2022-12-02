'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

const points = {
  'A X': 4,
  'A Y': 8,
  'A Z': 3,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 7,
  'C Y': 2,
  'C Z': 6,
};

const correctPoints = {
  'A X': 3,
  'A Y': 4,
  'A Z': 8,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 2,
  'C Y': 6,
  'C Z': 7,
};

readFile('input.txt').then((text) => {
  const strategies = text.split('\n');
  let score = 0;
  let correctScore = 0;
  strategies.forEach((strat) => {
    score += points[strat];
    correctScore += correctPoints[strat];
  });
  console.log(score);
  console.log(correctScore);
});
