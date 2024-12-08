package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Equation struct {
	Result  int
	Numbers []int
}

func main() {
	equations := readInput()
	sumOfLegitResults := sumLegitResults(equations, false)
	sumWithConcatenation := sumLegitResults(equations, true)

	fmt.Printf("Part 1 - sum of legit equations: %d\n", sumOfLegitResults)
	fmt.Printf("Part 2 - sum with concatenation: %d\n", sumWithConcatenation)
}

func readInput() []Equation {
	data, err := os.ReadFile("day07.txt")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}
	lines := strings.Split(string(data), "\n")

	var equations []Equation
	for _, line := range lines {
		if line == "" {
			continue
		}
		parts := strings.Split(line, ":")
		result, err := strconv.Atoi(strings.TrimSpace(parts[0]))
		if err != nil {
			log.Fatalf("Failed to parse result: %v", err)
		}
		numberStrings := strings.Fields(parts[1])
		var numbers []int
		for _, numStr := range numberStrings {
			num, err := strconv.Atoi(numStr)
			if err != nil {
				log.Fatalf("Failed to parse number: %v", err)
			}
			numbers = append(numbers, num)
		}
		equations = append(equations, Equation{Result: result, Numbers: numbers})
	}

	return equations
}

func sumLegitResults(equations []Equation, hasConcatanation bool) int {
	sum := 0
	for _, eq := range equations {
		if isLegit(eq, hasConcatanation) {
			sum += eq.Result
		}
	}
	return sum
}

func isLegit(equation Equation, hasConcatanation bool) bool {
	return checkCombinations(equation.Numbers, equation.Result, 0, equation.Numbers[0], hasConcatanation)
}

func checkCombinations(numbers []int, result, index, current int, hasConcatanation bool) bool {
	if index == len(numbers)-1 {
		return current == result
	}

	if checkCombinations(numbers, result, index+1, current+numbers[index+1], hasConcatanation) {
		return true
	}

	if checkCombinations(numbers, result, index+1, current*numbers[index+1], hasConcatanation) {
		return true
	}

	if !hasConcatanation {
		return false
	}

	concatenated, _ := strconv.Atoi(fmt.Sprintf("%d%d", current, numbers[index+1]))
	if checkCombinations(numbers, result, index+1, concatenated, hasConcatanation) {
		return true
	}

	return false
}
