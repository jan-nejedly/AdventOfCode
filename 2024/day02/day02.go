package main

import (
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := os.ReadFile("day02.txt")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	lines := strings.Split(string(data), "\n")
	safeLevels := countSafeLevels(lines, false)
	safeLevelsWithDampener := countSafeLevels(lines, true)

	fmt.Println("Part 1 - Safe Levels: ", safeLevels)
	fmt.Println("Part 2 - Safe Levels with Dampener: ", safeLevelsWithDampener)
}

func countSafeLevels(lines []string, useDampener bool) int {
	var safeLevels int

	for _, line := range lines {
		if line == "" {
			continue
		}

		parts := strings.Fields(line)
		if len(parts) < 2 {
			continue
		}

		numbers := make([]int, len(parts))
		for i, part := range parts {
			num, err := strconv.Atoi(part)
			if err != nil {
				log.Printf("Skipping line due to conversion error: %v", err)
				continue
			}
			numbers[i] = num
		}

		if isSafeLevel(numbers, useDampener) {
			safeLevels++
		}
	}

	return safeLevels
}

func isSafeLevel(numbers []int, useDampener bool) bool {
	if len(numbers) < 2 {
		return true
	}

	increasing := true
	decreasing := true
	isDiffCorrect := true

	for i := 1; i < len(numbers); i++ {
		diff := numbers[i] - numbers[i-1]
		absDiff := math.Abs(float64(diff))
		if !isDiffCorrect {
			continue
		}
		if absDiff < 1 || absDiff > 3 {
			isDiffCorrect = false
		}
		if diff > 0 {
			decreasing = false
		} else if diff < 0 {
			increasing = false
		}
	}

	if isDiffCorrect && (increasing || decreasing) {
		return true
	}

	if useDampener {
		for i := 0; i < len(numbers); i++ {
			newNumbers := make([]int, len(numbers)-1)
			copy(newNumbers, numbers[:i])
			copy(newNumbers[i:], numbers[i+1:])
			if isSafeLevel(newNumbers, false) {
				return true
			}
		}
	}

	return false
}
