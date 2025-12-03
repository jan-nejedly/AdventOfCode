import 'dart:io';

const filename = './2025/day03/day03.txt';

void main() {
  final data = readData(filename);
  final largestJoltages = data.map(findLargestJoltage).toList();
  final sumOfLargestJoltages = largestJoltages.reduce((a, b) => a + b);
  final largestBigJoltages = data.map(findLargestBigJoltage).toList();
  final sumOfLargestBigJoltages = largestBigJoltages.reduce((a, b) => a + b);
  print('Total output joltage: $sumOfLargestJoltages');
  print('Total big output joltage: $sumOfLargestBigJoltages');
}

List<String> readData(String filename) {
  final file = File(filename);
  final data = file.readAsStringSync();
  final banks = data.split('\n').where((line) => line.isNotEmpty).toList();
  return banks;
}

int findLargestJoltage(String bank) {
  final numbers = bank.split('').map(int.parse).toList();
  final firstPart = numbers.sublist(0, numbers.length - 1).toSet();
  final largestNumber = firstPart.reduce((a, b) => a > b ? a : b);
  final positionOfFirstLargestNumber = numbers.indexOf(largestNumber);
  final secondPart = numbers.sublist(positionOfFirstLargestNumber + 1).toSet();
  final largestNumberInSecondPart = secondPart.reduce((a, b) => a > b ? a : b);
  return int.parse('$largestNumber$largestNumberInSecondPart');
}

int findLargestBigJoltage(String bank) {
  final numbers = bank.split('').map(int.parse).toList();
  final largestJoltage = new List<int>.empty(growable: true);
  var startPosition = 0;
  var endCrop = 11;

  for (var i = 0; i < 12; i++) {
    final endPosition = numbers.length - endCrop;
    final searchablePart = numbers.sublist(startPosition, endPosition);
    final searchablePartSet = searchablePart.toSet();
    final largestNumber = searchablePartSet.reduce((a, b) => a > b ? a : b);
    final positionOfLargestNumber = searchablePart.indexOf(largestNumber);
    startPosition = startPosition + positionOfLargestNumber + 1;
    endCrop = endCrop - 1;
    largestJoltage.add(largestNumber);
  }

  return int.parse(largestJoltage.join(''));
}
