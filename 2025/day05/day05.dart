import 'dart:io';

const filename = './2025/day05/day05.txt';
void main() {
  final (fresh, ingredients) = readData(filename);
  final freshIngredients = getFreshIngredients(fresh, ingredients);
  final freshIngredientsCount = freshIngredients.length;
  print('Fresh ingredients count: $freshIngredientsCount');
  fresh.sort((a, b) => a[0].compareTo(b[0]));
  final deduplicatedRanges = getDeduplicatedRanges(fresh);
  final freshIdsCount = countFreshIds(deduplicatedRanges);
  print('Fresh IDs count: $freshIdsCount');
}

(List<List<int>>, List<int>) readData(String filename) {
  final file = File(filename);
  final data = file.readAsStringSync();
  final [ranges, numbers] = data.split('\n\n');
  final fresh = ranges
      .split('\n')
      .map((range) => range.split('-').map(int.parse).toList())
      .toList();
  final ingredients = numbers.split('\n').map(int.parse).toList();
  return (fresh, ingredients);
}

List<int> getFreshIngredients(List<List<int>> fresh, List<int> ingredients) {
  return ingredients.where((ingredient) {
    return fresh.any(
      (range) => ingredient >= range[0] && ingredient <= range[1],
    );
  }).toList();
}

List<List<int>> mergeRanges(List<List<int>> fresh) {
  final deduplicatedRanges = <List<int>>[];

  for (final range in fresh) {
    if (deduplicatedRanges.isEmpty) {
      deduplicatedRanges.add(range);
      continue;
    }

    final [start, end] = range;
    final [prevStart, prevEnd] = deduplicatedRanges.last;

    if (start <= prevEnd) {
      deduplicatedRanges.last = [prevStart, end > prevEnd ? end : prevEnd];
      continue;
    }

    deduplicatedRanges.add(range);
  }

  return deduplicatedRanges;
}

List<List<int>> getDeduplicatedRanges(List<List<int>> fresh) {
  List<List<int>> previous;
  List<List<int>> current = fresh;

  do {
    previous = current;
    current = mergeRanges(previous);
  } while (current.length != previous.length);

  return current;
}

int countFreshIds(List<List<int>> deduplicatedRanges) {
  return deduplicatedRanges.fold(0, (sum, range) {
    final [start, end] = range;
    return sum + (end - start) + 1;
  });
}
