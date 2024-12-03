package main

import (
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
)

func main() {
	data, err := os.ReadFile("day03.txt")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	sumOfMultiplications := processMultiplications(string(data))
	sumOfEnabledMultiplications := processEnabledMultiplications(string(data))

	fmt.Println("Part 1 - result:", sumOfMultiplications)
	fmt.Println("Part 2 - result:", sumOfEnabledMultiplications)
}

func processMultiplications(data string) int {
	re := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	matches := re.FindAllStringSubmatch(data, -1)

	sum := 0
	for _, match := range matches {
		num1, err1 := strconv.Atoi(match[1])
		num2, err2 := strconv.Atoi(match[2])
		if err1 != nil || err2 != nil {
			continue
		}
		sum += num1 * num2
	}

	return sum
}

func processEnabledMultiplications(data string) int {
	re := regexp.MustCompile(`(mul\((\d+),(\d+)\))|(do\(\))|(don't\(\))`)
	matches := re.FindAllStringSubmatch(data, -1)

	sum := 0
	mulEnabled := true

	for _, match := range matches {
		if match[1] != "" {
			if mulEnabled {
				num1, err1 := strconv.Atoi(match[2])
				num2, err2 := strconv.Atoi(match[3])
				if err1 != nil || err2 != nil {
					continue
				}
				sum += num1 * num2
			}
		} else if match[4] != "" {
			mulEnabled = true
		} else if match[5] != "" {
			mulEnabled = false
		}
	}

	return sum
}
