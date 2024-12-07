package main

import (
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	grid := readGrid()
	x, y := findGuardPosition(grid)
	visited, steps := countVisitedLocations(grid, x, y)
	infiniteLoops := countInfiniteLoops()

	fmt.Printf("Part 1 - visited locations: %d (steps: %d)\n", visited, steps)
	fmt.Printf("Part 2 - infinite loops: %d\n", infiniteLoops)
}

func readGrid() [][]rune {
	data, err := os.ReadFile("day06.txt")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	lines := strings.Split(string(data), "\n")
	grid := make([][]rune, len(lines))
	for i, line := range lines {
		grid[i] = []rune(line)
	}

	return grid
}

func findGuardPosition(grid [][]rune) (int, int) {
	for y, row := range grid {
		for x, char := range row {
			if char == '^' {
				return x, y
			}
		}
	}
	return -1, -1
}

func countVisitedLocations(grid [][]rune, x, y int) (int, int) {
	count := 0
	steps := 0
	directions := [][2]int{
		{-1, 0}, // up
		{0, 1},  // right
		{1, 0},  // down
		{0, -1}, // left
	}
	dirIndex := 0

	for {
		if x < 0 || y < 0 || y >= len(grid) || x >= len(grid[y]) || steps > 10000 {
			break
		}

		if grid[y][x] == '.' || grid[y][x] == '^' {
			grid[y][x] = 'X'
			count++
			steps++
		} else if grid[y][x] == 'X' {
			steps++
		} else {
			x -= directions[dirIndex][1]
			y -= directions[dirIndex][0]
			dirIndex = (dirIndex + 1) % 4
		}

		x += directions[dirIndex][1]
		y += directions[dirIndex][0]
	}
	return count, steps
}

func copyGrid(grid [][]rune) [][]rune {
	newGrid := make([][]rune, len(grid))
	for i := range grid {
		newGrid[i] = make([]rune, len(grid[i]))
		copy(newGrid[i], grid[i])
	}
	return newGrid
}

func countInfiniteLoops() int {
	grid := readGrid()
	infiniteLoopCount := 0

	for y := range grid {
		for x := range grid[y] {
			copiedGrid := copyGrid(grid)
			if copiedGrid[y][x] == '.' {
				copiedGrid[y][x] = '#'
				if isInfiniteLoop(copiedGrid) {
					infiniteLoopCount++
				}
			}
		}
	}

	return infiniteLoopCount
}

func isInfiniteLoop(grid [][]rune) bool {
	x, y := findGuardPosition(grid)
	if x == -1 || y == -1 {
		return false
	}

	locations, steps := countVisitedLocations(grid, x, y)
	if locations > 10000 || steps > 10000 {
		return true
	}
	return false
}
