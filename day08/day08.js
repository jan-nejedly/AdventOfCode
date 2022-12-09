'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function createTreeGrid(lines) {
  const treeGrid = [];
  lines.forEach((line) => {
    treeGrid.push(line.split(''));
  });
  return treeGrid;
}

function countVisibleTrees(treeGrid) {
  let visibleTrees = 0;
  const rows = treeGrid.length;
  const columns = treeGrid[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tree = new Tree(r, c);
      const treeHeight = treeGrid[r][c];
      const [left, right] = getRows(tree, columns, treeGrid);
      const [up, down] = getCols(tree, rows, treeGrid);
      if (
        left.every((height) => height < treeHeight) ||
        right.every((height) => height < treeHeight) ||
        up.every((height) => height < treeHeight) ||
        down.every((height) => height < treeHeight)
      ) {
        visibleTrees++;
      }
    }
  }
  return visibleTrees;
}

class Tree {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

function getRows(tree, columns, treeGrid) {
  const leftRow = [];
  const rightRow = [];
  for (let c = 0; c < columns; c++) {
    if (c < tree.col) leftRow.push(treeGrid[tree.row][c]);
    if (c > tree.col) rightRow.push(treeGrid[tree.row][c]);
  }
  return [leftRow, rightRow];
}

function getCols(tree, rows, treeGrid) {
  const upCol = [];
  const downCol = [];
  for (let r = 0; r < rows; r++) {
    if (r < tree.row) upCol.push(treeGrid[r][tree.col]);
    if (r > tree.row) downCol.push(treeGrid[r][tree.col]);
  }
  return [upCol, downCol];
}

function calcHighestScenicScore(treeGrid) {
  let highestScenicScore = 0;
  const rows = treeGrid.length;
  const columns = treeGrid[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tree = new Tree(r, c);
      const treeHeight = treeGrid[r][c];
      const [left, right] = getRows(tree, columns, treeGrid);
      const [up, down] = getCols(tree, rows, treeGrid);
      left.reverse();
      up.reverse();
      const visibility =
        calcVisibility(left, treeHeight) *
        calcVisibility(right, treeHeight) *
        calcVisibility(up, treeHeight) *
        calcVisibility(down, treeHeight);
      if (visibility > highestScenicScore) highestScenicScore = visibility;
    }
  }
  return highestScenicScore;
}

function calcVisibility(treeLine, treeHeight) {
  let visibility = 0;
  if (treeLine.length === 0) return visibility;
  for (let tree = 0; tree < treeLine.length; tree++) {
    visibility++;
    if (treeLine[tree] >= treeHeight) break;
  }
  return visibility;
}

readFile('input.txt').then((text) => {
  const lines = text.split('\n');
  const treeGrid = createTreeGrid(lines);
  console.log('Part One: ' + countVisibleTrees(treeGrid));
  console.log('Part Two: ' + calcHighestScenicScore(treeGrid));
});
