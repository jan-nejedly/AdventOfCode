package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := os.ReadFile("day05.txt")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	sections := strings.Split(string(data), "\n\n")
	rules := parseRules(strings.Split(sections[0], "\n"))
	updates := parseUpdates(strings.Split(sections[1], "\n"))

	sumOfMiddlePages := 0
	incorrectUpdates := [][]int{}

	for _, update := range updates {
		if isCorrectOrder(update, rules) {
			middlePage := findMiddlePage(update)
			sumOfMiddlePages += middlePage
		} else {
			incorrectUpdates = append(incorrectUpdates, update)
		}
	}

	fmt.Println("Part 1 - middle numbers total:", sumOfMiddlePages)

	sumOfCorrectedMiddlePages := 0

	for _, update := range incorrectUpdates {
		correctedUpdate := correctOrder(update, rules)
		middlePage := findMiddlePage(correctedUpdate)
		sumOfCorrectedMiddlePages += middlePage
	}

	fmt.Println("Part 2 - corrected middle numbers total:", sumOfCorrectedMiddlePages)
}

func parseRules(lines []string) [][2]int {
	var rules [][2]int
	for _, line := range lines {
		if line == "" {
			continue
		}
		parts := strings.Split(line, "|")
		x, _ := strconv.Atoi(parts[0])
		y, _ := strconv.Atoi(parts[1])
		rules = append(rules, [2]int{x, y})
	}
	return rules
}

func parseUpdates(lines []string) [][]int {
	var updates [][]int
	for _, line := range lines {
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		var update []int
		for _, part := range parts {
			num, _ := strconv.Atoi(part)
			update = append(update, num)
		}
		updates = append(updates, update)
	}
	return updates
}

func isCorrectOrder(update []int, rules [][2]int) bool {
	position := make(map[int]int)
	for i, page := range update {
		position[page] = i
	}
	for _, rule := range rules {
		x, y := rule[0], rule[1]
		posX, okX := position[x]
		posY, okY := position[y]
		if okX && okY && posX > posY {
			return false
		}
	}
	return true
}

func findMiddlePage(update []int) int {
	middleIndex := len(update) / 2
	return update[middleIndex]
}

func correctOrder(update []int, rules [][2]int) []int {
	graph := make(map[int][]int)
	inDegree := make(map[int]int)
	for _, page := range update {
		graph[page] = []int{}
		inDegree[page] = 0
	}
	for _, rule := range rules {
		x, y := rule[0], rule[1]
		if contains(update, x) && contains(update, y) {
			graph[x] = append(graph[x], y)
			inDegree[y]++
		}
	}
	queue := []int{}
	for page, degree := range inDegree {
		if degree == 0 {
			queue = append(queue, page)
		}
	}
	result := []int{}
	for len(queue) > 0 {
		page := queue[0]
		queue = queue[1:]
		result = append(result, page)
		for _, neighbor := range graph[page] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}
	return result
}

func contains(slice []int, item int) bool {
	for _, v := range slice {
		if v == item {
			return true
		}
	}
	return false
}
