'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function countContainingOneOther(text) {
  let containsCount = 0;
  const lines = text.split('\n');
  lines.forEach(line => {
    const [firstRange, secondRange] = line.split(',')
    if (containsOneOther(firstRange, secondRange)) containsCount++
  })
  return containsCount;
}

function containsOneOther(firstRange, secondRange) {
  const [firstRangeStart, firstRangeEnd] = firstRange.split('-');
  const [secondRangeStart, secondRangeEnd] = secondRange.split('-');
  if (+firstRangeStart >= +secondRangeStart && +firstRangeEnd <= +secondRangeEnd) return true
  if (+secondRangeStart >= +firstRangeStart && +secondRangeEnd <= +firstRangeEnd) return true
  return false;
}

function countOverlapingOneOther(text) {
  let overlapsCount = 0;
  const lines = text.split('\n');
  lines.forEach(line => {
    const [firstRange, secondRange] = line.split(',')
    if (overlapsOneOther(firstRange, secondRange)) overlapsCount++
  })
  return overlapsCount;
}

function overlapsOneOther(firstRange, secondRange) {
  const [firstRangeStart, firstRangeEnd] = firstRange.split('-');
  const [secondRangeStart, secondRangeEnd] = secondRange.split('-');
  if (+firstRangeStart >= +secondRangeStart && +firstRangeStart <= +secondRangeEnd) return true
  if (+firstRangeEnd >= +secondRangeStart && +firstRangeEnd <= +secondRangeEnd) return true
  if (+secondRangeStart >= +firstRangeStart && +secondRangeStart <= +firstRangeEnd) return true
  if (+secondRangeEnd >= +firstRangeStart && +secondRangeEnd <= +firstRangeEnd) return true
  return false;
}

readFile('input.txt').then((text) => {
  console.log(countContainingOneOther(text));
  console.log(countOverlapingOneOther(text));
});