'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function getCommonChar(firstStr, secondStr) {
  for (let i = 0; i < firstStr.length; i++) {
    for (let j = 0; j < secondStr.length; j++) {
      if (firstStr[i] === secondStr[j]) return firstStr[i];
    }
  }
}

function getBadge(firstRucksack, secondRucksack, thirdRucksack) {
  for (let i = 0; i < firstRucksack.length; i++) {
    for (let j = 0; j < secondRucksack.length; j++) {
      for (let k = 0; k < thirdRucksack.length; k++) {
        if (
          firstRucksack[i] === secondRucksack[j] &&
          secondRucksack[j] === thirdRucksack[k]
        ) {
          return firstRucksack[i];
        }
      }
    }
  }
}

readFile('input.txt').then((text) => {
  const rucksacks = text.split('\n');
  const priority = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let totalPriority = 0;
  let totalBadgePriority = 0;

  rucksacks.forEach((rucksack) => {
    const totalItems = rucksack.length;
    const firstCompartment = rucksack.slice(0, totalItems / 2);
    const secondCompartment = rucksack.slice(totalItems / 2);
    const commonItem = getCommonChar(firstCompartment, secondCompartment);
    totalPriority += priority.indexOf(commonItem);
  });

  for (let i = 0; i < rucksacks.length; i += 3) {
    const commnonBadge = getBadge(
      rucksacks[i],
      rucksacks[i + 1],
      rucksacks[i + 2]
    );
    totalBadgePriority += priority.indexOf(commnonBadge);
  }

  console.log(totalPriority);
  console.log(totalBadgePriority);
});
