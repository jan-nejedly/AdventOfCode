import 'dart:io';

const filename = './2025/day02/day02.txt';

void main() {
  final data = readData(filename);
  final invalidNumbers = getInvalidNumbers(data);
  final sumOfInvalidNumbers = invalidNumbers.reduce((a, b) => a + b);
  final allInvalidNumbers = getAllInvalidNumbers(data);
  final sumOfAllInvalidNumbers = allInvalidNumbers.reduce((a, b) => a + b);
  print('Sum of invalid numbers: $sumOfInvalidNumbers');
  print('Sum of all invalid numbers: $sumOfAllInvalidNumbers');
}

List<(int min, int max)> readData(String filename) {
  final file = File(filename);
  final data = file.readAsStringSync();
  final ranges = data.split(',');
  final pairs = ranges
      .map((range) => range.split('-').map(int.parse).toList())
      .map((pair) => (pair[0], pair[1]))
      .toList();
  return pairs;
}

List<int> getInvalidNumbers(List<(int min, int max)> data) {
  final invalidNumbers = <int>[];

  for (var (min, max) in data) {
    for (var i = min; i <= max; i++) {
      final number = i.toString();
      final splitPosition = number.length ~/ 2;
      final firstPart = number.substring(0, splitPosition);
      final secondPart = number.substring(splitPosition);
      if (firstPart == secondPart) invalidNumbers.add(i);
    }
  }

  return invalidNumbers;
}

List<int> getAllInvalidNumbers(List<(int min, int max)> data) {
  final invalidNumbers = <int>[];

  for (var (min, max) in data) {
    for (var i = min; i <= max; i++) {
      final number = i.toString();
      for (var j = 1; j <= number.length ~/ 2; j++) {
        final sequence = number.substring(0, j);
        final replacedNumber = number.replaceAll(sequence, '');
        final isInvalidNumber = replacedNumber.length == 0;
        if (isInvalidNumber) {
          invalidNumbers.add(i);
          break;
        }
      }
    }
  }

  return invalidNumbers;
}
