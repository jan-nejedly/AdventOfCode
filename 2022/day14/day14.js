'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function createCave(walls) {
  const cave = new Set();
  walls.forEach((wall) => {
    let previous;
    wall.split(' -> ').forEach((corner) => {
      cave.add(corner);
      let current = corner.split(',');
      if (typeof previous === 'undefined') previous = current;

      while (+previous[0] !== +current[0]) {
        if (+previous[0] > +current[0]) previous[0]--;
        if (+previous[0] < +current[0]) previous[0]++;
        cave.add([previous[0], previous[1]].join(','));
      }
      while (+previous[1] !== +current[1]) {
        if (+previous[1] > +current[1]) previous[1]--;
        if (+previous[1] < +current[1]) previous[1]++;
        cave.add([previous[0], previous[1]].join(','));
      }
    });
  });

  return cave;
}

function fillWithSand(cave, voidless) {
  const source = '500,0';
  let filled = false;
  let sandCount = 0;
  let floor;

  if (voidless) {
    let rocks = Array.from(cave);
    floor = rocks
      .map((rock) => rock.split(','))
      .map((rock) => +rock[1])
      .reduce((a, b) => Math.max(a, b));
    floor++;
  }

  while (!cave.has(source) && !filled) {
    cave.add(source);
    sandCount++;
    let [x, y] = source.split(',');
    let falling = true;
    let i = 0;
    while (falling) {
      if (!cave.has([+x, +y + 1].join(','))) {
        cave.delete([x, y].join(','));
        y++;
        cave.add([x, y].join(','));
        if (voidless && +y >= floor) falling = false;
      } else if (!cave.has([+x - 1, +y + 1].join(','))) {
        cave.delete([x, y].join(','));
        y++;
        x--;
        cave.add([x, y].join(','));
        if (voidless && +y >= floor) falling = false;
      } else if (!cave.has([+x + 1, +y + 1].join(','))) {
        cave.delete([x, y].join(','));
        y++;
        x++;
        cave.add([x, y].join(','));
        if (voidless && +y >= floor) falling = false;
      } else {
        falling = false;
      }
      i++;
      if (i > 800) {
        sandCount--;
        cave.delete([x, y].join(','));
        filled = true;
        break;
      }
    }
  }
  return sandCount;
}

readFile('input.txt').then((input) => {
  const walls = input.split('\n');
  let cave = createCave(walls);
  let sandCount = fillWithSand(cave, false);
  console.log('Part One: ' + sandCount);
  cave = createCave(walls);
  sandCount = fillWithSand(cave, true);
  console.log('Part Two: ' + sandCount);
});
