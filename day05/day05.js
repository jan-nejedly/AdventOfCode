'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function getStartState(lines) {
  const startState = [[], [], [], [], [], [], [], [], []];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    for (let j = 0; j < line.length / 4; j++) {
      if (line[j * 4 + 1] != ' ') {
        startState[j].push(line[j * 4 + 1]);
      }
    }
  }
  return startState;
}

function makeMoves(state, moves) {
  moves.forEach((move) => {
    const [_m, numberOfMoves, _f, fromStack, _t, toStack] = move.split(' ');
    for (let i = 0; i < numberOfMoves; i++) {
      const popped = state[fromStack - 1].pop();
      state[toStack - 1].push(popped);
    }
  });
  return state;
}

function makeCorrectMoves(state, moves) {
  moves.forEach((move) => {
    const [_m, numberOfMoves, _f, fromStack, _t, toStack] = move.split(' ');
    const popped = [];
    for (let i = 0; i < numberOfMoves; i++) {
      const item = state[fromStack - 1].pop();
      popped.unshift(item);
    }
    state[toStack - 1].push(...popped);
  });
  return state;
}

function getTopCrates(state) {
  const topCrates = [];
  state.forEach((stack) => {
    const topCrate = stack.pop();
    topCrates.push(topCrate);
  });
  return topCrates;
}

readFile('input.txt').then((text) => {
  const lines = text.split('\n');
  const indexOfDivider = lines.indexOf('');
  const startStateLines = lines.slice(0, indexOfDivider - 1);
  const moves = lines.slice(indexOfDivider + 1);
  // Part One
  const startState = getStartState(startStateLines);
  const endState = makeMoves(startState, moves);
  console.log(...getTopCrates(endState));
  // Part Two
  const startStateCorrect = getStartState(startStateLines);
  const endStateCorrect = makeCorrectMoves(startStateCorrect, moves);
  console.log(...getTopCrates(endStateCorrect));
});
