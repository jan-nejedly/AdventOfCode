package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"sort"
	"strconv"
	"strings"
)

func main() {
	data, err := ioutil.ReadFile("day01.txt")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	lines := strings.Split(string(data), "\n")
	firstNumbers, secondNumbers := processLines(lines)

	resultPart1 := calculateDistance(firstNumbers, secondNumbers)
	fmt.Println("Part 1 result:", resultPart1)

	resultPart2 := calculateSimilarityScore(firstNumbers, secondNumbers)
	fmt.Println("Part 2 result:", resultPart2)
}

func processLines(lines []string) ([]int, []int) {
	var firstNumbers []int
	var secondNumbers []int

	for _, line := range lines {
		if line == "" {
			continue
		}
		parts := strings.Fields(line)
		if len(parts) < 2 {
			continue
		}
		num1, err1 := strconv.Atoi(parts[0])
		num2, err2 := strconv.Atoi(parts[1])
		if err1 != nil || err2 != nil {
			log.Printf("Skipping line due to conversion error: %v, %v", err1, err2)
			continue
		}
		firstNumbers = append(firstNumbers, num1)
		secondNumbers = append(secondNumbers, num2)
	}

	return firstNumbers, secondNumbers
}

func calculateDistance(firstNumbers, secondNumbers []int) int {
	sort.Ints(firstNumbers)
	sort.Ints(secondNumbers)

	minLength := len(firstNumbers)
	if len(secondNumbers) < minLength {
		minLength = len(secondNumbers)
	}

	totalDifference := 0
	for i := 0; i < minLength; i++ {
		diff := math.Abs(float64(firstNumbers[i] - secondNumbers[i]))
		totalDifference += int(diff)
	}

	return totalDifference
}

func calculateSimilarityScore(firstNumbers, secondNumbers []int) int {
	countMap := make(map[int]int)
	for _, num := range secondNumbers {
		countMap[num]++
	}

	similarityScore := 0
	for _, num := range firstNumbers {
		similarityScore += num * countMap[num]
	}

	return similarityScore
}
