'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

class Monkey {
  constructor(items, operation, test, pass, fail) {
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.pass = pass;
    this.fail = fail;
    this.inspections = 0;
  }
}

function parseMonkeys(inputs) {
  const monkeys = [];
  inputs.split('\n\n').forEach((input) => {
    input = input.split('\n');
    let items = input[1]
      .substring(18)
      .split(', ')
      .map((item) => BigInt(item));
    const operation = [
      input[2][23],
      input[2].slice(input[2].lastIndexOf(' ') + 1),
    ];
    const test = BigInt(input[3].replace('  Test: divisible by ', ''));
    const pass = +input[4].replace('    If true: throw to monkey ', '');
    const fail = +input[5].replace('    If false: throw to monkey ', '');
    monkeys.push(new Monkey(items, operation, test, pass, fail));
  });
  return monkeys;
}

function calcMonkeyBusiness(monkeys, rounds, mod, veryWorried) {
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items[0]) {
        let worryLevel = monkey.items.shift() % mod;
        const second =
          monkey.operation[1] === 'old'
            ? worryLevel
            : BigInt(monkey.operation[1]);
        if (monkey.operation[0] === '+') worryLevel += second;
        else if (monkey.operation[0] === '*') worryLevel *= second;
        monkey.inspections++;
        if (!veryWorried) worryLevel /= 3n;
        monkeys[
          worryLevel % monkey.test == 0 ? monkey.pass : monkey.fail
        ].items.push(worryLevel);
      }
    });
  }
  const inspections = monkeys.map((m) => m.inspections).sort((a, b) => b - a);
  return inspections[0] * inspections[1];
}

function calcMod(monkeys) {
  return monkeys.reduce((m, monkey) => m * monkey.test, 1n);
}

readFile('input.txt').then((text) => {
  const monkeysOne = parseMonkeys(text);
  const mod = calcMod(monkeysOne);
  console.log('Part 1: ' + calcMonkeyBusiness(monkeysOne, 20, mod, false));
  const monkeysTwo = parseMonkeys(text);
  console.log('Part 2: ' + calcMonkeyBusiness(monkeysTwo, 10000, mod, true));
});
