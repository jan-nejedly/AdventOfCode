'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

class Rope {
  head = [0, 0];
  visited = new Set();
  move = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  };

  constructor(length) {
    this.length = length;
    this.tails = [];
    for (let i = 0; i < length; i++) {
      this.tails.push([0, 0]);
    }
  }

  moveHead(direction) {
    this.head = this.head.map((cord, id) => cord + this.move[direction][id]);
    if (!this.isTouching(this.tails[0], this.head)) {
      this.updateTail(this.tails[0], this.head);
      if (this.tails.length === 1) {
        this.visited.add(this.tails[0].toString());
      }
    }
    for (let i = 0; i < this.tails.length - 1; i++) {
      if (!this.isTouching(this.tails[i + 1], this.tails[i])) {
        this.updateTail(this.tails[i + 1], this.tails[i]);
        if (i === this.tails.length - 2) {
          this.visited.add(this.tails[i + 1].toString());
        }
      }
    }
  }

  isTouching(firstPoint, secondPoint) {
    return (
      Math.abs(firstPoint[0] - secondPoint[0]) <= 1 &&
      Math.abs(firstPoint[1] - secondPoint[1]) <= 1
    );
  }

  updateTail(partToUpdate, accordingToPart) {
    if (accordingToPart[0] > partToUpdate[0]) {
      partToUpdate[0]++;
    }
    if (accordingToPart[0] < partToUpdate[0]) {
      partToUpdate[0]--;
    }
    if (accordingToPart[1] > partToUpdate[1]) {
      partToUpdate[1]++;
    }
    if (accordingToPart[1] < partToUpdate[1]) {
      partToUpdate[1]--;
    }
  }
}

readFile('input.txt').then((text) => {
  const moves = text.split('\n');

  const ropeOne = new Rope(1);
  ropeOne.visited.add('0,0');
  moves.forEach((move) => {
    move = move.split(' ');
    for (let i = 0; i < move[1]; i++) {
      ropeOne.moveHead(move[0]);
    }
  });
  console.log('Part One: ' + ropeOne.visited.size);

  const ropeTwo = new Rope(9);
  ropeTwo.visited.add('0,0');
  moves.forEach((move) => {
    move = move.split(' ');
    for (let i = 0; i < move[1]; i++) {
      ropeTwo.moveHead(move[0]);
    }
  });
  console.log('Part Two: ' + ropeTwo.visited.size);
});
