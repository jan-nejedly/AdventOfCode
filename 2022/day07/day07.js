'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function getDirectories(lines) {
  const directories = new Map();
  let pwd = [];
  let sum = 0;
  let lastWasBack = false;
  lines.forEach((line) => {
    line = line.split(' ');
    if (line[0] === '$' && line[1] === 'cd') {
      if (!lastWasBack && pwd.length > 0) {
        for (let i = 0; i < pwd.length; i++) {
          const dirName = pwd.slice(0, i + 1).join('/');
          const previous =
            directories.get(dirName) === undefined
              ? 0
              : directories.get(dirName);
          directories.set(dirName, previous + sum);
        }
      }
      sum = 0;
      lastWasBack = line[2] === '..' ? true : false;
      if (line[2] === '/') pwd = ['root'];
      if (line[2] === '..') pwd.pop();
      if (line[2] !== '/' && line[2] !== '..') pwd.push(line[2]);
    }
    if (!isNaN(line[0])) {
      sum += +line[0];
    }
  });
  return directories;
}

function calcTotalSpace(directories) {
  let totalSpace = 0;
  directories.forEach((dir) => {
    if (dir < 100000) totalSpace += dir;
  });
  return totalSpace;
}

function calcNeededSpace(directories, updateSize) {
  return updateSize - (70000000 - directories.get('root'));
}

function findDeletedSpace(directories, spaceNeeded) {
  let minSpace = directories.get('root');
  directories.forEach((dir) => {
    if (dir >= spaceNeeded && minSpace > dir) minSpace = dir;
  });
  return minSpace;
}

readFile('input.txt').then((text) => {
  const lines = text.split('\n');
  const directories = getDirectories(lines);
  const totalSpace = calcTotalSpace(directories);
  const neededSpace = calcNeededSpace(directories, 30000000);
  const deletedSpace = findDeletedSpace(directories, neededSpace);
  console.log('Part One: ' + totalSpace);
  console.log('Part Two: ' + deletedSpace);
});
