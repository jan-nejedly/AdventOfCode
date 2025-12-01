import 'dart:io';

void main() {
  final data = readData('./2025/day01/day01.txt');
  final zeros = countZeros(data);
  final allZeros = countAllZeros(data);
  print('Zeros: $zeros');
  print('All zeros: $allZeros');
}

List<String> readData(String filename) {
  final file = File(filename);
  final data = file.readAsStringSync();
  final lines = data.split('\n');
  return lines.where((line) => line.isNotEmpty).toList();
}

List<int> rotateDial(int currentState, String rotation) {
  final direction = rotation[0];
  final clicks = int.parse(rotation.substring(1));
  var result = currentState;
  var zeros = 0;
  for (var i = 0; i < clicks; i++) {
    if (direction == 'L') result--;
    if (result < 0) result = 99;
    if (direction == 'R') result++;
    if (result > 99) result = 0;
    if (result == 0) zeros++;
  }
  return [result, zeros];
}

int countZeros(List<String> data) {
  var zeros = 0;
  var currentDialState = 50;
  for (var instructions in data) {
    final [result, _] = rotateDial(currentDialState, instructions);
    if (result == 0) zeros++;
    currentDialState = result;
  }
  return zeros;
}

int countAllZeros(List<String> data) {
  var totalZeros = 0;
  var currentDialState = 50;
  for (var instructions in data) {
    final [result, zeros] = rotateDial(currentDialState, instructions);
    totalZeros = totalZeros + zeros;
    currentDialState = result;
  }
  return totalZeros;
}
