'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function createMap(input) {
  const lines = input.split('\n');
  const map = Array(lines.length)
    .fill()
    .map(() => Array(lines[0].length).fill());
  lines.forEach((line, y) => {
    line.split('').forEach((position, x) => (map[y][x] = position));
  });
  return map;
}

class Node {
  constructor(X, Y, path, height) {
    this.X = X;
    this.Y = Y;
    this.path = path;
    this.height = height;
  }
}

function breadthFirstSearch(map, startingCords) {
  const startNode = new Node(startingCords[0], startingCords[1], '', 'a');
  const fringe = [];
  const closed = [];
  fringe.push(startNode);

  while (fringe.length > 0) {
    const node = fringe.shift();
    if (map[node.Y][node.X] === 'E') return node.path;

    if (!closed.includes([node.Y, node.X].join('|'))) {
      closed.push([node.Y, node.X].join('|'));

      if (node.Y > 0) {
        const height = map[node.Y - 1][node.X].replace('E', 'z');
        if (height.charCodeAt(0) - node.height.charCodeAt(0) <= 1)
          fringe.push(new Node(node.X, node.Y - 1, node.path + 'U', height));
      }
      if (node.Y < map.length - 1) {
        const height = map[node.Y + 1][node.X].replace('E', 'z');
        if (height.charCodeAt(0) - node.height.charCodeAt(0) <= 1) {
          fringe.push(new Node(node.X, node.Y + 1, node.path + 'D', height));
        }
      }
      if (node.X < map[0].length - 1) {
        const height = map[node.Y][node.X + 1].replace('E', 'z');
        if (height.charCodeAt(0) - node.height.charCodeAt(0) <= 1) {
          fringe.push(new Node(node.X + 1, node.Y, node.path + 'R', height));
        }
      }
      if (node.X > 0) {
        const height = map[node.Y][node.X - 1].replace('E', 'z');
        if (height.charCodeAt(0) - node.height.charCodeAt(0) <= 1) {
          fringe.push(new Node(node.X - 1, node.Y, node.path + 'L', height));
        }
      }
    }
  }
}

function getStartingCords(map) {
  for (let i = 0; i < map.length; i++) {
    if (map[i].indexOf('S') !== -1) return [map[i].indexOf('S'), i];
  }
}

function getPossibleStarts(map) {
  const possibleStarts = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'a') possibleStarts.push([j, i]);
    }
  }
  return possibleStarts;
}

function getHikePath(map, possibleStarts) {
  let minHikePath = breadthFirstSearch(map, getStartingCords(map));
  possibleStarts.forEach((start) => {
    const path = breadthFirstSearch(map, start);
    if (typeof path !== 'undefined' && path.length < minHikePath.length)
      minHikePath = path;
  });
  return minHikePath;
}

readFile('input.txt').then((input) => {
  const map = createMap(input);
  const startingCords = getStartingCords(map);
  const pathOne = breadthFirstSearch(map, startingCords);
  console.log('Part One: ' + pathOne.length);
  const possibleStarts = getPossibleStarts(map);
  const pathTwo = getHikePath(map, possibleStarts);
  console.log('Part Two: ' + pathTwo.length);
});
