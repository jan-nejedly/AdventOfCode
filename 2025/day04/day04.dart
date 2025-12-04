import 'dart:io';

const filename = './2025/day04/day04.txt';

void main() {
  final grid = readData(filename);
  final rollsCount = countRolls(grid);
  final accessibleRollsCount = countAccessibleRolls(grid);
  final cleanedGrid = removeAllAccessibleRolls(grid);
  final cleanedGridRollsCount = countRolls(cleanedGrid);
  final rollsCleanedCount = rollsCount - cleanedGridRollsCount;
  print('Rolls count: $rollsCount');
  print('Accessible rolls count: $accessibleRollsCount');
  print('Cleaned grid rolls count: $cleanedGridRollsCount');
  print('Rolls cleaned count: $rollsCleanedCount');
}

List<List<String>> readData(String filename) {
  final file = File(filename);
  final data = file.readAsStringSync();
  final rows = data.split('\n').where((line) => line.isNotEmpty).toList();
  final grid = rows.map((row) => row.split('')).toList();
  return grid;
}

int countAdjacentRolls(List<List<String>> grid, int x, int y) {
  final adjacentCords = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];
  int rollsCount = 0;
  for (final cord in adjacentCords) {
    final adjacentX = cord[0];
    final adjacentY = cord[1];
    if (adjacentX >= 0 &&
        adjacentX < grid[0].length &&
        adjacentY >= 0 &&
        adjacentY < grid.length) {
      final adjacentCord = grid[adjacentY][adjacentX];
      if (adjacentCord == '@') rollsCount++;
    }
  }
  return rollsCount;
}

int countAccessibleRolls(List<List<String>> grid) {
  var accessibleRollsCount = 0;
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x] != '@') continue;
      if (countAdjacentRolls(grid, x, y) < 4) {
        accessibleRollsCount++;
      }
    }
  }
  return accessibleRollsCount;
}

int countRolls(List<List<String>> grid) {
  int rollsCount = 0;
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x] == '@') rollsCount++;
    }
  }
  return rollsCount;
}

List<List<String>> removeAccessibleRolls(List<List<String>> grid) {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x] != '@') continue;
      if (countAdjacentRolls(grid, x, y) < 4) {
        grid[y][x] = '.';
      }
    }
  }
  return grid;
}

List<List<String>> removeAllAccessibleRolls(List<List<String>> grid) {
  while (true) {
    int rollsCount = countRolls(grid);
    var updatedGrid = removeAccessibleRolls(grid);
    int updatedRollsCount = countRolls(updatedGrid);
    if (updatedRollsCount == rollsCount) break;
    grid = updatedGrid;
  }
  return grid;
}
