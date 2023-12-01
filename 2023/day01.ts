import * as fs from 'fs';

async function calcCalibrationValue() {
  try {
    const data = await fs.promises.readFile('day01.txt', 'utf8');
    const rows = data.split('\n');
    const numbersInRows = rows.map((row) => row.replace(/[^0-9]/g, ''));

    const firstAndLastNumbers = numbersInRows.map((row) =>
      Number(`${row[0]}${row[row.length - 1]}`)
    );

    const sum = firstAndLastNumbers.reduce((acc, num) => acc + num, 0);
    console.log('Sum of calibration values:', sum);

    const rowsWithWords = rows.map((row) =>
      row
        .replace(/1/g, 'one')
        .replace(/2/g, 'two')
        .replace(/3/g, 'three')
        .replace(/4/g, 'four')
        .replace(/5/g, 'five')
        .replace(/6/g, 'six')
        .replace(/7/g, 'seven')
        .replace(/8/g, 'eight')
        .replace(/9/g, 'nine')
    );

    const startNumbers = rowsWithWords.map((row) => {
      for (let i = 3; i <= row.length; i++) {
        const number = getNumberFromString(row.slice(0, i));
        if (number) return number;
      }
    });

    const endNumbers = rowsWithWords.map((row) => {
      for (let i = 3; i <= row.length; i++) {
        const number = getNumberFromString(row.slice(-i));
        if (number) return number;
      }
    });

    const fullNumbers = startNumbers.map(
      (startNum, i) => +`${startNum}${endNumbers[i]}`
    );

    const correctSum = fullNumbers.reduce((acc, num) => acc + num, 0);
    console.log('Correct sum of calibration values:', correctSum);
  } catch (e) {
    console.error(e);
  }
}

function getNumberFromString(string: string) {
  if (string.includes('one')) return 1;
  if (string.includes('two')) return 2;
  if (string.includes('three')) return 3;
  if (string.includes('four')) return 4;
  if (string.includes('five')) return 5;
  if (string.includes('six')) return 6;
  if (string.includes('seven')) return 7;
  if (string.includes('eight')) return 8;
  if (string.includes('nine')) return 9;
  return null;
}

calcCalibrationValue();
